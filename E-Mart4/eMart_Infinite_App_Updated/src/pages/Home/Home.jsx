import {useNavigate} from 'react-router-dom';
import {categories,images,allProducts} from '../../data/catalog';
import Icon from '../../components/ui/Icon';
import {useCart} from '../../context/CartContext';

const fallbackByCategory={
 shopping:images.shoppingHero,
 food:images.restaurant,
 medicine:images.medicine,
 travel:images.flight,
 hotel:images.hotel,
 finance:images.banking
};

function SmartImage({src,fallback,alt,className=''}) {
 const safeFallback=fallback||images.city;
 const handleError=(e)=>{
   if(e.currentTarget.dataset.fallback==='1') return;
   e.currentTarget.dataset.fallback='1';
   e.currentTarget.src=safeFallback;
 };
 return <img className={className} src={src} alt={alt||''} loading="lazy" onError={handleError}/>;
}

export default function Home(){
 const nav=useNavigate();
 const {addToCart}=useCart();
 const shopping=allProducts.filter(p=>p.category==='shopping');
 const food=allProducts.filter(p=>p.category==='food');
 const medicine=allProducts.filter(p=>p.category==='medicine');

 return <div className="home">
  <section className="premiumHero premiumHeroAdvanced">
   <div className="heroAtmosphere" aria-hidden="true">
    <span className="heroRing ringOne"></span><span className="heroRing ringTwo"></span>
    <span className="heroLight lightOne"></span><span className="heroLight lightTwo"></span>
   </div>
   <div className="premiumHeroCopy heroCopyAdvanced">
    <span className="eyebrow"><i className="liveDot"></i> eMART INFINITE · NEXT-GEN COMMERCE</span>
    <h1>One intelligent place for<br/><strong>everything you do.</strong></h1>
    <p>Real shopping, food delivery, travel, payments and everyday services — brought together in one polished experience with intelligent discovery.</p>
    <div className="heroActions">
      <button className="primary" onClick={()=>nav('/service/shopping')}>Explore marketplace <Icon name="arrow" size={16}/></button>
      <button className="outline" onClick={()=>nav('/service/food')}>Order real food</button>
    </div>
    <div className="heroMetrics">
      <span><b>150+</b><small>service paths</small></span><span><b>4.9</b><small>experience rating</small></span><span><b>24/7</b><small>support access</small></span><span><b>100%</b><small>secure flow</small></span>
    </div>
   </div>
   <div className="hero3DRealStage" aria-label="Interactive 3D service showcase">
    <div className="hero3DShadow"></div>
    <div className="heroCoreGlass">
      <div className="coreTopline"><span>LIVE ECOSYSTEM</span><i></i></div>
      <div className="corePhone">
        <div className="phoneFrame">
          <div className="phoneScreen">
            <SmartImage src={images.phone} fallback={images.phone2} alt="Modern smartphone" />
            <span className="phoneReflection"></span>
            <span className="phoneStatus">eMART <b>∞</b></span>
            <div className="phoneWidget"><small>SMART MATCH</small><strong>Best choice found</strong><span>4.9 ★ · ₹54,999</span></div>
          </div>
        </div>
      </div>
      <div className="orbit orbitA"></div><div className="orbit orbitB"></div>
    </div>
    <div className="floatingPhoto photoFood">
      <SmartImage src={images.biryani} fallback={images.restaurant} alt="Hyderabadi biryani" />
      <span><b>Food</b><small>Nearby & fast</small></span>
    </div>
    <div className="floatingPhoto photoTravel">
      <SmartImage src={images.flight} fallback={images.flight2} alt="Air travel" />
      <span><b>Travel</b><small>Flights & stays</small></span>
    </div>
    <div className="floatingPhoto photoPay">
      <div className="realCard">
        <div><small>eMART PAY</small><b>•••• 4826</b></div><strong>∞</strong>
      </div>
      <span><b>Payments</b><small>Fast & protected</small></span>
    </div>
    <div className="floatingChip chipAI"><span className="aiPulse"></span><b>AI</b><small>Smart assist</small></div>
   </div>
  </section>

  <section className="section nextGenSection">
    <div className="nextGenHead">
      <div><span className="eyebrow">NEXT-GEN EXPERIENCE</span><h2>Designed to feel <strong>alive.</strong></h2><p>Real photography, depth, motion and service-aware interactions — without turning the product into a cartoon.</p></div>
      <button className="textBtn" onClick={()=>nav('/service/more')}>Explore ecosystem <Icon name="arrow" size={14}/></button>
    </div>
    <div className="nextGenGrid">
      <article className="experiencePanel panelShopping" onClick={()=>nav('/service/shopping')}>
        <div className="panelMedia"><SmartImage src={images.shoppingHero} fallback={images.fashion} alt="Modern retail" /><span className="depthShade"></span><div className="mediaBadge">01 · MARKETPLACE</div></div>
        <div className="experienceCopy"><span>REAL COMMERCE</span><h3>Shop with depth.</h3><p>Phones, fashion, audio and more presented with real product photography.</p><button className="glassAction">Open shopping <Icon name="arrow" size={14}/></button></div>
      </article>
      <article className="experiencePanel panelFood" onClick={()=>nav('/service/food')}>
        <div className="panelMedia"><SmartImage src={images.biryani} fallback={images.restaurant} alt="Fresh biryani" /><span className="depthShade"></span><div className="mediaBadge">02 · FOOD</div></div>
        <div className="experienceCopy"><span>REAL MEALS</span><h3>Food that looks real.</h3><p>Restaurant discovery with rich imagery, ratings and quick actions.</p><button className="glassAction">Order food <Icon name="arrow" size={14}/></button></div>
      </article>
      <article className="experiencePanel panelTravel" onClick={()=>nav('/service/flight')}>
        <div className="panelMedia"><SmartImage src={images.beach} fallback={images.flight} alt="Travel destination" /><span className="depthShade"></span><div className="mediaBadge">03 · TRAVEL</div></div>
        <div className="experienceCopy"><span>REAL JOURNEYS</span><h3>Plan beyond the screen.</h3><p>Flights, buses and stays in a dedicated travel-first flow.</p><button className="glassAction">Plan a trip <Icon name="arrow" size={14}/></button></div>
      </article>
    </div>
  </section>

  <section className="section ecosystemStrip">
    <div className="sectionHead"><div><span className="eyebrow">DISCOVER</span><h2>Every service has its own world.</h2><p>Move between focused experiences without losing the eMart identity.</p></div><button className="textBtn" onClick={()=>nav('/service/more')}>All services <Icon name="arrow" size={14}/></button></div>
    <div className="serviceMosaic">{categories.map(([slug,name,desc,img],i)=><button key={slug} className={`serviceTile tile-${i+1}`} onClick={()=>nav(`/service/${slug}`)}><SmartImage src={images[img]||images.city} fallback={fallbackByCategory[slug]||images.city} alt={name}/><span className="tileShade"/><div className="tileContent"><span className="tileIndex">{String(i+1).padStart(2,'0')}</span><b>{name}</b><small>{desc}</small></div><Icon name="arrow" size={18}/></button>)}</div>
  </section>

  <section className="section editorialGrid">
   <article className="editorialCard wide depthCard"><SmartImage src={images.fashion} fallback={images.shoppingHero} alt="Fashion shopping"/><div><span className="eyebrow">SHOPPING</span><h2>Real products. Better discovery.</h2><p>From smartphones to footwear, explore a dedicated marketplace with useful product signals.</p><button className="outline" onClick={()=>nav('/service/shopping')}>Explore shopping <Icon name="arrow" size={15}/></button></div></article>
   <article className="editorialCard depthCard"><SmartImage src={images.recharge} fallback={images.banking} alt="Digital payment"/><div><span className="eyebrow">RECHARGE</span><h2>Pay in seconds.</h2><p>Mobile, electricity, water and broadband in one payment area.</p><button className="outline" onClick={()=>nav('/service/recharge')}>Open payments <Icon name="arrow" size={15}/></button></div></article>
   <article className="editorialCard depthCard"><SmartImage src={images.hotel} fallback={images.resort} alt="Hotel stay"/><div><span className="eyebrow">TRAVEL</span><h2>Trips that feel separate.</h2><p>Flights, buses, hotels and packages use travel-specific imagery.</p><button className="outline" onClick={()=>nav('/service/flight')}>Plan a trip <Icon name="arrow" size={15}/></button></div></article>
  </section>

  <Catalog title="New in shopping" eyebrow="SHOPPING" items={shopping.slice(0,8)} fallback={images.shoppingHero} onView={()=>nav('/service/shopping')} onAdd={addToCart} onOpen={id=>nav(`/product/${id}`)}/>
  <Catalog title="Popular food near you" eyebrow="FOOD DELIVERY" items={food.slice(0,8)} fallback={images.restaurant} onView={()=>nav('/service/food')} onAdd={addToCart} onOpen={id=>nav(`/product/${id}`)}/>
  <Catalog title="Health essentials" eyebrow="MEDICINE & HEALTH" items={medicine.slice(0,4)} fallback={images.medicine} onView={()=>nav('/service/medicine')} onAdd={addToCart} onOpen={id=>nav(`/product/${id}`)}/>
 </div>
}

function Catalog({title,eyebrow,items,onView,onAdd,onOpen,fallback}){
 return <section className="section">
  <div className="sectionHead"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div><button className="textBtn" onClick={onView}>View all <Icon name="arrow" size={14}/></button></div>
  <div className="productRail">{items.map(p=><article className="proCard proCard3D" key={p.id} onClick={()=>onOpen(p.id)}>
    <div className="proImage"><SmartImage src={p.image} fallback={fallback} alt={p.name}/><span>{p.tag}</span><i className="imageDepth"></i></div>
    <div className="proBody"><small>{p.seller}</small><h3>{p.name}</h3><div className="proPrice"><strong>₹{p.price.toLocaleString('en-IN')}</strong><del>₹{p.oldPrice.toLocaleString('en-IN')}</del></div><div className="proMeta"><span>★ {p.rating}</span><button onClick={e=>{e.stopPropagation();onAdd(p)}}>Add <Icon name="plus" size={13}/></button></div></div>
  </article>)}</div>
 </section>
}
