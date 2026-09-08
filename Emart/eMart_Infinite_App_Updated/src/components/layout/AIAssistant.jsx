import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Icon from '../ui/Icon';
import {allProducts} from '../../data/catalog';

const suggestions=[['Food','/service/food'],['Shopping','/service/shopping'],['Medicine','/service/medicine'],['Cart','/cart']];
function localReply(text){
 const q=text.toLowerCase().trim();
 const found=allProducts.filter(p=>`${p.name} ${p.tag} ${p.seller} ${p.category}`.toLowerCase().includes(q)).slice(0,5);
 if(found.length && q.length>2) return {text:`I found ${found.length} matching result${found.length>1?'s':''} for “${text}”. Opening the smart search results for you.`,to:`/compare/search?q=${encodeURIComponent(text)}`};
 if(/food|pizza|biryani|burger|dosa|pasta/.test(q)) return {text:'Food Delivery is ready with pizza, biryani, burgers, dosa, pasta and more.',to:'/service/food'};
 if(/iphone|shopping|laptop|shoe|camera|watch|phone/.test(q)) return {text:'Shopping includes phones, electronics, fashion, footwear, cameras, watches and bags.',to:'/service/shopping'};
 if(/medicine|tablet|vitamin|doctor|health/.test(q)) return {text:'Medicine & Health keeps medicines, wellness products and health services in one place.',to:'/service/medicine'};
 if(/recharge|bill|electricity/.test(q)) return {text:'Recharge & Bills has dedicated mobile and utility payment flows.',to:'/service/recharge'};
 if(/login|register|account|sign in/.test(q)) return {text:'Your account area supports registration and sign in.',to:'/auth/login'};
 if(/cart|checkout|order/.test(q)) return {text:'Your cart is ready. You can review items and continue to secure checkout.',to:'/cart'};
 if(/hotel|flight|travel/.test(q)) return {text:'Travel has separate flight, hotel and getaway experiences.',to:'/service/flight'};
 return {text:'I’m eMart Infinite, your smart shopping assistant. Try “iPhone”, “biryani”, “medicine”, “hotels”, “recharge” or “show my cart”.'};
}
export default function AIAssistant(){
 const nav=useNavigate();
 const [open,setOpen]=useState(false);
 const [q,setQ]=useState('');
 const [busy,setBusy]=useState(false);
 const [msgs,setMsgs]=useState([{from:'ai',text:'Hi. I’m eMart Infinite. Tell me what you want to buy, book, compare or manage.'}]);
 const send=async()=>{
   const text=q.trim(); if(!text||busy)return;
   setQ(''); setMsgs(m=>[...m,{from:'user',text}]); setBusy(true);
   try{
     const r=await fetch('/api/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
     const data=await r.json();
     const result=data.reply?{text:data.reply,to:data.action}:localReply(text);
     setMsgs(m=>[...m,{from:'ai',text:result.text,action:result.to}]);
     if(result.to)setTimeout(()=>nav(result.to),350);
   }catch{
     const result=localReply(text);
     setMsgs(m=>[...m,{from:'ai',text:result.text,action:result.to}]);
     if(result.to)setTimeout(()=>nav(result.to),350);
   }finally{setBusy(false)}
 };
 return <>
  <button className="aiLauncher" onClick={()=>setOpen(v=>!v)}><Icon name="spark" size={18}/><span>eMart Infinite</span><i></i></button>
  {open&&<div className="aiPanel">
   <div className="aiHead"><div><b>eMart Infinite</b><small>{busy?'Thinking…':'Online · Smart shopping assistant'}</small></div><button onClick={()=>setOpen(false)}><Icon name="close" size={16}/></button></div>
   <div className="aiMsgs">{msgs.map((m,i)=><div key={i} className={`aiMsg ${m.from}`}>{m.text}{m.action&&<button className="aiAction" onClick={()=>nav(m.action)}>Open now <Icon name="arrow" size={13}/></button>}</div>)}</div>
   <div className="aiQuick">{suggestions.map(([label,to])=><button key={label} onClick={()=>nav(to)}>{label}</button>)}</div>
   <div className="aiInput"><input value={q} onChange={e=>setQ(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask eMart Infinite anything..."/><button onClick={send} disabled={busy}><Icon name="send" size={16}/></button></div>
  </div>}
 </>
}
