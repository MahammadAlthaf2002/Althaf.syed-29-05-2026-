import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCart} from '../../context/CartContext';
import Icon from '../../components/ui/Icon';

const paymentOptions = [
  {id:'UPI', title:'UPI', note:'Fast & secure', icon:'wallet'},
  {id:'Card', title:'Credit / Debit Card', note:'Visa, Mastercard & more', icon:'card'},
  {id:'Cash on delivery', title:'Cash on Delivery', note:'Pay when it arrives', icon:'box'}
];

export default function Checkout(){
  const {total,clearCart}=useCart();
  const nav=useNavigate();
  const [done,setDone]=useState(false);
  const [form,setForm]=useState({name:'',phone:'',address:'',payment:'UPI',cardNumber:'',expiry:'',cvv:''});
  const set=(key,value)=>setForm(prev=>({...prev,[key]:value}));
  const submit=e=>{e.preventDefault();setDone(true);clearCart();};

  if(done) return <div className="successPage">
    <div className="successIcon"><Icon name="check" size={34}/></div>
    <span className="eyebrow">ORDER CONFIRMED</span>
    <h1>You're all set.</h1>
    <p>Your order request has been recorded successfully. A confirmation would be sent to your registered contact in a production backend.</p>
    <button className="primary" onClick={()=>nav('/')}>Continue browsing <Icon name="arrow" size={16}/></button>
  </div>;

  return <div className="checkoutPage">
    <section className="checkoutMain">
      <div className="checkoutTop">
        <button className="backLink" onClick={()=>nav(-1)}><Icon name="arrow" size={15} className="backArrow"/> Back</button>
        <span className="eyebrow">SECURE CHECKOUT · 256-BIT ENCRYPTED</span>
        <h1>Complete your order</h1>
        <p>Enter your delivery details and select a payment method. Everything is organized in one secure flow.</p>
      </div>

      <form className="checkoutForm" onSubmit={submit}>
        <div className="formSection">
          <div className="formSectionHead"><span>01</span><div><h3>Delivery details</h3><small>Where should we deliver your order?</small></div></div>
          <div className="formGrid">
            <div className="formField"><label htmlFor="name">Full name</label><input id="name" required value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Enter your full name"/></div>
            <div className="formField"><label htmlFor="phone">Mobile number</label><input id="phone" required inputMode="numeric" pattern="[0-9]{10}" value={form.phone} onChange={e=>set('phone',e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile number"/></div>
            <div className="formField fullField"><label htmlFor="address">Delivery address</label><textarea id="address" required value={form.address} onChange={e=>set('address',e.target.value)} placeholder="House / flat, street, city, state, PIN code"/></div>
          </div>
        </div>

        <div className="formSection">
          <div className="formSectionHead"><span>02</span><div><h3>Payment method</h3><small>Choose your preferred way to pay</small></div></div>
          <div className="paymentChoices">
            {paymentOptions.map(option=><button type="button" key={option.id} className={`paymentChoice ${form.payment===option.id?'selected':''}`} onClick={()=>set('payment',option.id)}>
              <span className="paymentChoiceIcon"><Icon name={option.icon} size={20}/></span>
              <span><b>{option.title}</b><small>{option.note}</small></span>
              <i className="paymentRadio">{form.payment===option.id?'✓':''}</i>
            </button>)}
          </div>

          {form.payment==='Card'&&<div className="cardFields">
            <div className="formField fullField"><label htmlFor="cardNumber">Card number</label><input id="cardNumber" required inputMode="numeric" value={form.cardNumber} onChange={e=>set('cardNumber',e.target.value.replace(/\D/g,'').slice(0,16))} placeholder="1234 5678 9012 3456"/></div>
            <div className="formField"><label htmlFor="expiry">Expiry</label><input id="expiry" required value={form.expiry} onChange={e=>set('expiry',e.target.value)} placeholder="MM / YY"/></div>
            <div className="formField"><label htmlFor="cvv">CVV</label><input id="cvv" required inputMode="numeric" maxLength="3" value={form.cvv} onChange={e=>set('cvv',e.target.value.replace(/\D/g,'').slice(0,3))} placeholder="•••"/></div>
          </div>}

          {form.payment==='UPI'&&<div className="upiHint"><Icon name="check" size={16}/><span>You'll be redirected to your preferred UPI app after placing the order.</span></div>}
        </div>

        <button className="primary full placeOrder" type="submit">Place order · ₹{total.toLocaleString('en-IN')} <Icon name="arrow" size={17}/></button>
        <small className="checkoutLegal">By placing the order, you agree to the eMart Infinite App terms and secure payment flow.</small>
      </form>
    </section>

    <aside className="checkoutSide">
      <div className="paymentVisual" aria-hidden="true">
        <div className="paymentOrb"></div>
        <div className="paymentCard3d"><div className="cardChip"></div><div className="cardWave">∞</div><small>eMart Infinite</small><strong>SECURE PAY</strong></div>
      </div>
      <span>ORDER TOTAL</span>
      <h2>₹{total.toLocaleString('en-IN')}</h2>
      <div className="secureBadge"><Icon name="check" size={15}/><span><b>Protected checkout</b><small>Your payment details stay private.</small></span></div>
      <div className="trustList"><div><Icon name="check"/> No hidden convenience fee</div><div><Icon name="check"/> Real-time order tracking</div><div><Icon name="check"/> 24/7 customer support</div><div><Icon name="check"/> Secure payment processing</div></div>
      <div className="summaryLine"><span>Order value</span><b>₹{total.toLocaleString('en-IN')}</b></div>
      <div className="summaryLine"><span>Delivery</span><b>FREE</b></div>
    </aside>
  </div>;
}
