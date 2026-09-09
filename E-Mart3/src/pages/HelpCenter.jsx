import {useMemo,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Icon from '../components/ui/Icon';
import {categories,services} from '../data/catalog';

const faqs=[
 ['How do I search for a product?','Use the main search bar or eMart Infinite Assistant. Matching products now appear with real catalog photography and prices.'],
 ['How do I add an item to cart?','Open any product card and select Add to cart. You can then review everything from My Cart.'],
 ['How do I get food options?','Search pizza, biryani, burger, dosa or another food item. The assistant shows related food options directly in the chat.'],
 ['How do I contact customer support?','Open Support → Customer support chat to talk with the eMart Infinite Assistant, or use Help Center guides here.'],
 ['Can I compare products?','Yes. Search a product and open its detail page to review the listing and available information.'],
];
export default function HelpCenter(){
 const nav=useNavigate(); const [q,setQ]=useState('');
 const results=useMemo(()=>faqs.filter(([a,b])=>`${a} ${b}`.toLowerCase().includes(q.toLowerCase())),[q]);
 return <div className="helpCenter">
   <button className="backLink" onClick={()=>nav(-1)}><Icon name="arrow" size={15}/> Back</button>
   <section className="helpHero">
     <div><span className="eyebrow">eMART INFINITE · HELP CENTER</span><h1>How can we help?</h1><p>Find quick answers, service guides and direct support without leaving the app.</p>
       <div className="helpSearch"><Icon name="search" size={19}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search help, orders, products or support..."/></div>
     </div>
     <div className="helpVisual"><span className="helpOrb"><Icon name="help" size={40}/></span><b>Support, simplified.</b><small>Search · learn · chat</small></div>
   </section>
   <section className="section"><div className="sectionHead"><div><span className="eyebrow">QUICK ACCESS</span><h2>Popular help topics</h2></div><button className="primary" onClick={()=>window.dispatchEvent(new CustomEvent('open-emart-assistant',{detail:{prompt:'I need customer support'}}))}><Icon name="support" size={16}/> Chat with assistant</button></div>
    <div className="helpTopics">{['Orders & cart','Search & products','Food delivery','Payments','Account','Customer support'].map((x,i)=><button key={x} onClick={()=>setQ(x.split(' ')[0])}><span>{String(i+1).padStart(2,'0')}</span><b>{x}</b><Icon name="arrow" size={15}/></button>)}</div>
   </section>
   <section className="section"><div className="sectionHead"><div><span className="eyebrow">FAQ</span><h2>{q?`Results for “${q}”`:'Frequently asked questions'}</h2></div></div>
    <div className="faqList">{results.length?results.map(([a,b])=><article key={a}><div className="faqIcon"><Icon name="check" size={17}/></div><div><h3>{a}</h3><p>{b}</p></div></article>):<div className="emptyState"><Icon name="search" size={30}/><h2>No help articles found</h2><p>Try another keyword or chat with the eMart Infinite Assistant.</p></div>}</div>
   </section>
   <section className="section"><div className="sectionHead"><div><span className="eyebrow">SERVICE GUIDES</span><h2>Explore by service</h2></div></div>
    <div className="helpServiceGrid">{categories.slice(0,8).map(([slug,name,desc,img])=><button key={slug} onClick={()=>nav(`/service/${slug}`)}><span className="helpServiceImage"><img src={services[slug]?.image||''} alt=""/></span><span><b>{name}</b><small>{desc}</small></span><Icon name="arrow" size={14}/></button>)}</div>
   </section>
 </div>
}