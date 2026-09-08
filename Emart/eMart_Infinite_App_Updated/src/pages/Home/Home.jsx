import {useNavigate} from 'react-router-dom';
import {categories,images,allProducts} from '../../data/catalog';
import Icon from '../../components/ui/Icon';
import {useCart} from '../../context/CartContext';

export default function Home(){
 const nav=useNavigate(); const {addToCart}=useCart();
 const shopping=allProducts.filter(p=>p.category==='shopping'); const food=allProducts.filter(p=>p.category==='food'); const medicine=allProducts.filter(p=>p.category==='medicine');
 return <div className="home">
  <section className="premiumHero">
   <div className="premiumHeroCopy">
    <span className="eyebrow">Althaf · ONE SUPER APP</span>
    <h1>Everything you need,<br/><strong>beautifully organized.</strong></h1>
    <p>Shop phones and fashion, order real food, book flights and stays, recharge your number and manage everyday services from focused, separate experiences.</p>
    <div className="heroActions"><button className="primary" onClick={()=>nav('/service/shopping')}>Start shopping <Icon name="arrow" size={16}/></button><button className="outline" onClick={()=>nav('/service/food')}>Order food</button></div>
    <div className="heroMetrics"><span><b>150+</b><small>services</small></span><span><b>4.9</b><small>app rating</small></span><span><b>24/7</b><small>support</small></span><span><b>100%</b><small>secure flow</small></span></div>
   </div>
   <div className="heroMedia">
    <img className="heroMainImage" src={images.phone} alt="Smartphone shopping"/>
    <div className="heroImageCard heroFood"><img src={images.biryani} alt="Biryani"/><div><small>Food delivery</small><b>Real meals nearby</b></div></div>
    <div className="heroImageCard heroTravel"><img src={images.flight} alt="Flight"/><div><small>Travel</small><b>Flights & stays</b></div></div>
   </div>
  </section>

  <section className="section">
   <div className="sectionHead"><div><span className="eyebrow">DISCOVER</span><h2>Choose a service</h2><p>Each area has its own content, imagery, actions and data.</p></div><button className="textBtn" onClick={()=>nav('/service/more')}>All services <Icon name="arrow" size={14}/></button></div>
   <div className="serviceMosaic">{categories.map(([slug,name,desc,img],i)=><button key={slug} className={`serviceTile tile-${i+1}`} onClick={()=>nav(`/service/${slug}`)}><img src={images[img]||images.city} alt=""/><span className="tileShade"/><div className="tileContent"><span className="tileIndex">0{i+1}</span><b>{name}</b><small>{desc}</small></div><Icon name="arrow" size={18}/></button>)}</div>
  </section>

  <section className="section editorialGrid">
   <article className="editorialCard wide"><img src={images.fashion} alt="Fashion shopping"/><div><span className="eyebrow">SHOPPING</span><h2>Phones, footwear, fashion & accessories.</h2><p>Real product photography, separate categories and focused shopping actions.</p><button className="outline" onClick={()=>nav('/service/shopping')}>Explore shopping <Icon name="arrow" size={15}/></button></div></article>
   <article className="editorialCard"><img src={images.recharge} alt="Payment"/><div><span className="eyebrow">RECHARGE</span><h2>Recharge & bills.</h2><p>Mobile, electricity, water and broadband in one payment area.</p><button className="outline" onClick={()=>nav('/service/recharge')}>Open payments <Icon name="arrow" size={15}/></button></div></article>
   <article className="editorialCard"><img src={images.hotel} alt="Hotel"/><div><span className="eyebrow">TRAVEL</span><h2>Trips that feel separate.</h2><p>Flights, buses, hotels and packages use travel-specific imagery.</p><button className="outline" onClick={()=>nav('/service/flight')}>Plan a trip <Icon name="arrow" size={15}/></button></div></article>
  </section>

  <Catalog title="New in shopping" eyebrow="SHOPPING" items={shopping.slice(0,8)} onView={()=>nav('/service/shopping')} onAdd={addToCart} onOpen={id=>nav(`/product/${id}`)}/>
  <Catalog title="Popular food near you" eyebrow="FOOD DELIVERY" items={food.slice(0,8)} onView={()=>nav('/service/food')} onAdd={addToCart} onOpen={id=>nav(`/product/${id}`)}/>
  <Catalog title="Health essentials" eyebrow="MEDICINE & HEALTH" items={medicine.slice(0,4)} onView={()=>nav('/service/medicine')} onAdd={addToCart} onOpen={id=>nav(`/product/${id}`)}/>
 </div>
}

function Catalog({title,eyebrow,items,onView,onAdd,onOpen}){return <section className="section"><div className="sectionHead"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><button className="textBtn" onClick={onView}>View all <Icon name="arrow" size={14}/></button></div><div className="productRail">{items.map(p=><article className="proCard" key={p.id} onClick={()=>onOpen(p.id)}><div className="proImage"><img src={p.image} alt={p.name}/><span>{p.tag}</span></div><div className="proBody"><small>{p.seller}</small><h3>{p.name}</h3><div className="proPrice"><strong>₹{p.price.toLocaleString('en-IN')}</strong><del>₹{p.oldPrice.toLocaleString('en-IN')}</del></div><div className="proMeta"><span>★ {p.rating}</span><button onClick={e=>{e.stopPropagation();onAdd(p)}}>Add <Icon name="plus" size={13}/></button></div></div></article>)}</div></section>}
