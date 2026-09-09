import {useMemo,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Icon from '../ui/Icon';
import {useCart} from '../../context/CartContext';
import {allProducts} from '../../data/catalog';

export default function Header(){
 const nav=useNavigate();
 const {count}=useCart();
 const [q,setQ]=useState('');
 const [open,setOpen]=useState(false);
 const [supportOpen,setSupportOpen]=useState(false);
 const logged=Boolean(localStorage.getItem('nyb_user'));
 let user={name:'Guest'};
 try{user=JSON.parse(localStorage.getItem('nyb_user'))||user}catch{}

 const matches=useMemo(()=>{
   const value=q.trim().toLowerCase();
   if(!value)return [];
   return allProducts.filter(p=>`${p.name} ${p.tag} ${p.seller} ${p.category}`.toLowerCase().includes(value)).slice(0,6);
 },[q]);

 const search=()=>{if(q.trim())nav(`/compare/search?q=${encodeURIComponent(q.trim())}`)};
 return <>
  <header className="header">
   <button className="mobileMenu" aria-label="Open services" onClick={()=>nav('/service/more')}><Icon name="menu"/></button>
   <div className="searchWrap">
    <div className="search"><Icon name="search" size={19}/><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} placeholder="Search products, food, medicines, travel & services..."/><span className="searchHint">⌘ K</span><button onClick={search}>Search</button></div>
    {q.trim()&&<div className="searchDropdown">
      <div className="searchDropHead"><span>SMART SEARCH</span><small>{matches.length?`${matches.length} quick matches`:'Search the full catalog'}</small></div>
      {matches.map(p=><button className="searchResult" key={p.id} onClick={()=>nav(`/product/${p.id}`)}><img src={p.image} alt="" onError={e=>e.currentTarget.classList.add('imgFailed')}/><span><b>{p.name}</b><small>{p.tag} · ₹{p.price.toLocaleString('en-IN')}</small></span><Icon name="arrow" size={14}/></button>)}
      <button className="searchAll" onClick={search}>View all results for “{q.trim()}” <Icon name="arrow" size={14}/></button>
    </div>}
   </div>
   <div className="headerActions">
    <button className="supportBtn" onClick={()=>setSupportOpen(true)}><Icon name="support"/><span><b>Support</b><small>24/7 help</small></span></button>
    <button className="iconBtn" onClick={()=>nav('/service/more')} aria-label="Notifications"><Icon name="bell"/><i>3</i></button>
    <button className="iconBtn" onClick={()=>nav('/cart')} aria-label="Cart"><Icon name="cart"/><i>{count}</i></button>
    <div className="account" onClick={()=>setOpen(v=>!v)}>{logged?<div className="avatar">{user.name?.[0]?.toUpperCase()||'U'}</div>:<img className="guestAvatar" src="/assets/guest-avatar.svg" alt="Guest profile"/>}<div><b>{logged?user.name:'Guest'}</b><small>{logged?'Signed in':'Login / Register'}</small></div><Icon name="chevron" size={15}/>{open&&<div className="accountMenu"><button onClick={()=>nav(logged?'/account':'/auth/login')}>{logged?'My account':'Login / Register'}</button><button onClick={()=>nav('/cart')}>My cart ({count})</button><button onClick={()=>nav('/service/premium')}>eMart Premium</button></div>}</div>
   </div>
  </header>

  {supportOpen&&<div className="modalBackdrop" onMouseDown={e=>e.target===e.currentTarget&&setSupportOpen(false)}>
    <section className="supportModal" role="dialog" aria-modal="true" aria-label="Customer support">
      <div className="supportModalHead"><div className="supportIcon"><Icon name="support" size={22}/></div><div><span className="eyebrow">eMART INFINITE SUPPORT</span><h2>How can we help?</h2><p>Quick answers and direct support options.</p></div><button className="modalClose" onClick={()=>setSupportOpen(false)}><Icon name="close" size={18}/></button></div>
      <div className="supportGrid">
        <button onClick={()=>{setSupportOpen(false);nav('/help-center')}}><Icon name="help"/><span><b>Help center</b><small>Search guides, FAQs and service help</small></span><Icon name="arrow" size={15}/></button>
        <button onClick={()=>{setSupportOpen(false);window.location.href='mailto:support@emartinfinite.app?subject=eMart%20Infinite%20Support'}}><Icon name="send"/><span><b>Email support</b><small>Get help from our support team</small></span><Icon name="arrow" size={15}/></button>
        <button onClick={()=>{setSupportOpen(false);window.dispatchEvent(new CustomEvent('open-emart-assistant',{detail:{prompt:'I need live customer support'}}));}}><Icon name="support"/><span><b>Customer support chat</b><small>Talk directly with eMart Infinite Assistant</small></span><Icon name="arrow" size={15}/></button>
        <button onClick={()=>{setSupportOpen(false);nav('/cart')}}><Icon name="cart"/><span><b>Order help</b><small>Review your cart and checkout</small></span><Icon name="arrow" size={15}/></button>
      </div>
      <div className="supportFooter"><span><i></i> Support online 24/7</span><b>Response time: usually under 5 min</b></div>
    </section>
  </div>}
 </>
}
