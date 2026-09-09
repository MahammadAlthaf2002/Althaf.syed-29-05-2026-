import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import AIAssistant from './AIAssistant';

export default function AppShell(){
 return <div className="app">
  <div className="global3DLayer" aria-hidden="true">
   <span className="ambientOrb ambientOrbOne"></span>
   <span className="ambientOrb ambientOrbTwo"></span>
   <span className="ambientGrid"></span>
   <span className="ambientBeam"></span>
  </div>
  <Sidebar/>
  <div className="appMain">
   <Header/>
   <main className="page"><Outlet/></main>
   <AIAssistant/>
   <footer className="footer"><div><strong>eMart Infinite App</strong><span>One app. Infinite possibilities.</span></div><span>Secure payments · 24/7 support · Built for everyday life</span></footer>
  </div>
 </div>
}
