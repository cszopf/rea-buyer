
import React, { useRef, useEffect } from 'react';
import { BrandConfig, AgentInfo } from '../types';

interface LayoutProps {
  brand: BrandConfig;
  agent: AgentInfo;
  children: React.ReactNode;
  propertyAddress: string;
}

const Layout: React.FC<LayoutProps> = ({ brand, agent, children, propertyAddress }) => {
  const scrollContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [children]);

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row overflow-hidden h-screen fixed inset-0">
      {/* Sidebar - Desktop / Header - Mobile */}
      <aside 
        className="w-full md:w-80 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col p-4 md:p-8 md:sticky md:top-0 h-auto md:h-screen overflow-y-auto shrink-0 z-20 shadow-sm md:shadow-none"
      >
        <div className="md:mb-12 mb-0 flex md:flex-col justify-between items-center md:items-start">
          <div className="flex flex-col">
            <h1 
              className="font-header uppercase-tracking-150 text-base md:text-2xl leading-none mb-1" 
              style={{ color: brand.primaryColor }}
            >
              {brand.logoName}
            </h1>
            <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Transaction Center
            </p>
          </div>
          
          <div className="md:mt-4 text-right md:text-left">
            <p className="text-[10px] md:text-sm font-bold text-slate-800 flex items-center gap-1 md:gap-2 justify-end md:justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate max-w-[120px] md:max-w-none">{propertyAddress}</span>
            </p>
          </div>
        </div>

        <div className="mt-auto hidden md:block">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transition-all group-hover:w-full group-hover:opacity-5"></div>
            <h3 className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-4">Your Agent</h3>
            <div className="flex items-center gap-4 mb-5">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm" 
              />
              <div>
                <p className="font-black text-slate-900 text-sm leading-tight">{agent.name}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5">{agent.brokerage}</p>
              </div>
            </div>
            <div className="flex gap-2 relative z-10">
              <button 
                className="flex-1 py-2 text-[10px] font-black rounded-lg border uppercase tracking-widest transition-all hover:bg-slate-50"
                style={{ borderColor: brand.accentColor, color: brand.primaryColor }}
                onClick={() => window.location.href = `tel:${agent.phone}`}
              >
                CALL
              </button>
              <button 
                className="flex-1 py-2 text-[10px] font-black rounded-lg text-white uppercase tracking-widest transition-all shadow-md active:scale-95"
                style={{ backgroundColor: brand.primaryColor }}
              >
                MSG
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area - Scrollable */}
      <main 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth relative h-full bg-white flex flex-col"
      >
        <div className="max-w-4xl mx-auto w-full p-4 md:p-12 lg:p-20 pb-32 md:pb-24 flex-1">
          {children}
        </div>
      </main>
      
      {/* Mobile Agent Footer (Sticky) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-3 flex items-center justify-between z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl bg-white/80">
         <div className="flex items-center gap-3">
            <img src={agent.image} className="w-10 h-10 rounded-xl border border-slate-100 shadow-sm object-cover" alt={agent.name} />
            <div className="flex flex-col">
              <p className="font-black text-slate-900 text-xs uppercase tracking-tighter">{agent.name}</p>
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">WCT Steward</p>
            </div>
         </div>
         <div className="flex gap-2">
           <button 
              className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600"
              onClick={() => window.location.href = `tel:${agent.phone}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
           <button 
              className="px-4 py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-md transition-all active:scale-95"
              style={{ backgroundColor: brand.primaryColor }}
            >
              MESSAGE
            </button>
         </div>
      </div>
    </div>
  );
};

export default Layout;
