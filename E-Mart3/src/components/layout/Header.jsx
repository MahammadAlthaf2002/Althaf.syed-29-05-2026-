import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon';
import { useCart } from '../../context/CartContext';
import { allProducts } from '../../data/catalog';

export default function Header() {
  const nav = useNavigate();
  const { count } = useCart();

  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('emart_theme') !== 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('emart_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.account')) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const logged = Boolean(localStorage.getItem('nyb_user'));

  let user = { name: 'Guest' };
  try {
    user = JSON.parse(localStorage.getItem('nyb_user')) || user;
  } catch {
    user = { name: 'Guest' };
  }

  const matches = useMemo(() => {
    const value = q.trim().toLowerCase();

    if (!value) {
      return [];
    }

    return allProducts
      .filter((product) => {
        const searchableText =
          (product.name || '') + ' ' +
          (product.tag || '') + ' ' +
          (product.seller || '') + ' ' +
          (product.category || '');

        return searchableText.toLowerCase().includes(value);
      })
      .slice(0, 6);
  }, [q]);

  const search = () => {
    const value = q.trim();

    if (!value) {
      return;
    }

    setQ('');
    nav('/compare/search?q=' + encodeURIComponent(value));
  };

  const selectProduct = (productId) => {
    setQ('');
    setOpen(false);
    nav('/product/' + productId);
  };

  const getFallbackImage = (category) => {
    if (category === 'food') return '/assets/fallback-food.svg';
    if (category === 'medicine') return '/assets/fallback-medicine.svg';
    if (category === 'hotel') return '/assets/fallback-hotel.svg';
    if (category === 'travel') return '/assets/fallback-travel.svg';
    return '/assets/fallback-shopping.svg';
  };

  const toggleTheme = (event) => {
    event.stopPropagation();
    setDarkMode((value) => !value);
  };

  return (
    <>
      <header className="header">
        <button
          className="mobileMenu"
          aria-label="Open services"
          onClick={() => nav('/service/more')}
          type="button"
        >
          <Icon name="menu" />
        </button>

        <div className="searchWrap">
          <div className="search">
            <Icon name="search" size={19} />

            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') search();
                if (event.key === 'Escape') setQ('');
              }}
              placeholder="Search products, food, medicines, travel & services..."
              aria-label="Search products, food, medicines, travel and services"
            />

            <span className="searchHint">⌘ K</span>

            <button onClick={search} type="button">
              Search
            </button>
          </div>

          {q.trim() && (
            <div className="searchDropdown">
              <div className="searchDropHead">
                <span>SMART SEARCH</span>
                <small>
                  {matches.length
                    ? matches.length + ' quick matches'
                    : 'Search the full catalog'}
                </small>
              </div>

              {matches.length > 0 ? (
                matches.map((product) => (
                  <button
                    className="searchResult"
                    key={product.id}
                    type="button"
                    onClick={() => selectProduct(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = getFallbackImage(product.category);
                      }}
                    />

                    <span>
                      <b>{product.name}</b>
                      <small>
                        {product.tag || product.category} · ₹
                        {Number(product.price || 0).toLocaleString('en-IN')}
                      </small>
                    </span>

                    <Icon name="arrow" size={14} />
                  </button>
                ))
              ) : (
                <div className="searchEmpty">
                  <span>No quick matches found.</span>
                  <small>Press Search to search the full catalog.</small>
                </div>
              )}

              <button className="searchAll" onClick={search} type="button">
                View all results for &quot;{q.trim()}&quot;
                <Icon name="arrow" size={14} />
              </button>
            </div>
          )}
        </div>

        <div className="headerActions">
          <button
            className="supportBtn"
            onClick={() => setSupportOpen(true)}
            type="button"
          >
            <Icon name="support" />
            <span>
              <b>Support</b>
              <small>24/7 help</small>
            </span>
          </button>

          <button
            className={'themeToggle ' + (darkMode ? 'isDark' : 'isLight')}
            onClick={toggleTheme}
            type="button"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
            <b>{darkMode ? 'Light' : 'Dark'}</b>
          </button>

          <button
            className="iconBtn"
            onClick={() => nav('/service/more')}
            aria-label="Notifications"
            type="button"
          >
            <Icon name="bell" />
            <i>3</i>
          </button>

          <button
            className="iconBtn"
            onClick={() => nav('/cart')}
            aria-label="Cart"
            type="button"
          >
            <Icon name="cart" />
            <i>{count}</i>
          </button>

          <div
            className="account"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((value) => !value);
            }}
          >
            {logged ? (
              <div className="avatar">
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
            ) : (
              <img
                className="guestAvatar"
                src="/assets/guest-avatar.svg"
                alt="Guest profile"
              />
            )}

            <div>
              <b>{logged ? user.name : 'Guest'}</b>
              <small>{logged ? 'Signed in' : 'Login / Register'}</small>
            </div>

            <Icon name="chevron" size={15} />

            {open && (
              <div
                className="accountMenu"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    nav(logged ? '/account' : '/auth/login');
                  }}
                >
                  {logged ? 'My account' : 'Login / Register'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    nav('/cart');
                  }}
                >
                  My cart ({count})
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    nav('/service/premium');
                  }}
                >
                  eMart Premium
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {supportOpen && (
        <div
          className="modalBackdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSupportOpen(false);
            }
          }}
        >
          <section
            className="supportModal"
            role="dialog"
            aria-modal="true"
            aria-label="Customer support"
          >
            <div className="supportModalHead">
              <div className="supportIcon">
                <Icon name="support" size={22} />
              </div>

              <div>
                <span className="eyebrow">eMART INFINITE SUPPORT</span>
                <h2>How can we help?</h2>
                <p>Quick answers and direct support options.</p>
              </div>

              <button
                className="modalClose"
                onClick={() => setSupportOpen(false)}
                type="button"
                aria-label="Close support"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="supportGrid">
              <button
                type="button"
                onClick={() => {
                  setSupportOpen(false);
                  nav('/help-center');
                }}
              >
                <Icon name="help" />
                <span>
                  <b>Help center</b>
                  <small>Search guides, FAQs and service help</small>
                </span>
                <Icon name="arrow" size={15} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSupportOpen(false);
                  window.location.href =
                    'mailto:support@emartinfinite.app?subject=eMart%20Infinite%20Support';
                }}
              >
                <Icon name="send" />
                <span>
                  <b>Email support</b>
                  <small>Get help from our support team</small>
                </span>
                <Icon name="arrow" size={15} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSupportOpen(false);
                  window.dispatchEvent(
                    new CustomEvent('open-emart-assistant', {
                      detail: { prompt: 'I need live customer support' }
                    })
                  );
                }}
              >
                <Icon name="support" />
                <span>
                  <b>Customer support chat</b>
                  <small>Talk directly with eMart Infinite Assistant</small>
                </span>
                <Icon name="arrow" size={15} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSupportOpen(false);
                  nav('/cart');
                }}
              >
                <Icon name="cart" />
                <span>
                  <b>Order help</b>
                  <small>Review your cart and checkout</small>
                </span>
                <Icon name="arrow" size={15} />
              </button>
            </div>

            <div className="supportFooter">
              <span>
                <i></i>
                Support online 24/7
              </span>
              <b>Response time: usually under 5 min</b>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
