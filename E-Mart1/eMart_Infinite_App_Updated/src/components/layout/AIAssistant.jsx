import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Icon from '../ui/Icon';
import {allProducts} from '../../data/catalog';

const suggestions=[['Food','/service/food'],['Shopping','/service/shopping'],['Medicine','/service/medicine'],['Cart','/cart']];

function searchProducts(text){
 const q=text.toLowerCase().trim();
 const terms=q.split(/\s+/).filter(Boolean);
 let list=allProducts.filter(p=>{
   const hay=`${p.name} ${p.tag} ${p.seller} ${p.category}`.toLowerCase();
   return terms.some(t=>hay.includes(t));
 });
 if(/food|pizza|biryani|burger|dosa|pasta|chicken|salad|dessert/.test(q)){
   const food=allProducts.filter(p=>p.category==='food');
   list=[...list,...food.filter(p=>!list.some(x=>x.id===p.id))];
 }
 return list.slice(0,8);
}
function localReply(text){
 const q=text.toLowerCase().trim();
 const found=searchProducts(text);
 if(found.length && q.length>1) return {text:`I found ${found.length} real catalog item${found.length>1?'s':''} related to “${text}”. Choose one below or ask for more options.`};
 if(/shopping|laptop|shoe|camera|watch|phone/.test(q)) return {text:'Shopping is ready. Ask for a phone, laptop, shoes, camera or watch.'};
 if(/medicine|vitamin|doctor|health/.test(q)) return {text:'Medicine & Health is ready for your request.'};
 if(/recharge|bill|electricity/.test(q)) return {text:'Recharge & Bills is ready for your request.'};
 if(/hotel|flight|travel/.test(q)) return {text:'Travel is ready for flights, hotels and getaways.'};
 return {text:'I’m eMart Infinite Assistant. Search a product, food item, medicine, travel option or service.'};
}
export default function AIAssistant(){
 const nav=useNavigate();
 const [open,setOpen]=useState(false);
 const [q,setQ]=useState('');
 const [busy,setBusy]=useState(false);
 const [msgs,setMsgs]=useState([{from:'ai',text:'Hi. I’m eMart Infinite Assistant. Search anything and I’ll show matching real catalog items here.'}]);

 useEffect(()=>{
   const handler=e=>{setOpen(true); if(e.detail?.prompt)setQ(e.detail.prompt)};
   window.addEventListener('open-emart-assistant',handler);
   return ()=>window.removeEventListener('open-emart-assistant',handler);
 },[]);

 const send=async()=>{
   const text=q.trim(); if(!text||busy)return;
   setQ(''); setMsgs(m=>[...m,{from:'user',text}]); setBusy(true);
   const found=searchProducts(text);
   try{
     const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
     const data=await r.json();
     const reply=data.reply||localReply(text).text;
     setMsgs(m=>[...m,{from:'ai',text:found.length?localReply(text).text:reply,products:found}]);
   }catch{
     setMsgs(m=>[...m,{from:'ai',text:localReply(text).text,products:found}]);
   }finally{setBusy(false)}
 };

 return <>
  <button className="aiLauncher" onClick={()=>setOpen(v=>!v)}><span className="aiLogo"><Icon name="spark" size={16}/></span><span>eMart Infinite Assistant</span><i></i></button>
  {open&&<div className="aiPanel">
   <div className="aiHead"><div className="aiIdentity"><span className="aiLogo large"><Icon name="spark" size={17}/></span><span><b>eMart Infinite Assistant</b><small>{busy?'Finding real catalog items…':'Online · Product & support assistant'}</small></span></div><button onClick={()=>setOpen(false)}><Icon name="close" size={16}/></button></div>
   <div className="aiMsgs">{msgs.map((m,i)=><div key={i} className={`aiMsg ${m.from}`}>
      <div>{m.text}</div>
      {m.products?.length>0&&<div className="aiProducts">{m.products.map(p=><button className="aiProduct" key={p.id} onClick={()=>nav(`/product/${p.id}`)}>
        <img src={p.image} alt={p.name}/><span><b>{p.name}</b><small>{p.tag} · ★ {p.rating}</small><strong>₹{p.price.toLocaleString('en-IN')}</strong></span><Icon name="arrow" size={13}/>
      </button>)}</div>}
    </div>)}</div>
   <div className="aiQuick">{suggestions.map(([label,to])=><button key={label} onClick={()=>nav(to)}>{label}</button>)}</div>
   <div className="aiInput"><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Try “pizza”, “iPhone”, “headphones”..."/><button onClick={send} disabled={busy}><Icon name="send" size={16}/></button></div>
  </div>}
 </>
}