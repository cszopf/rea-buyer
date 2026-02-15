
import React, { useState, useEffect } from 'react';
import { BrandConfig, AgentInfo } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface DashboardProps {
  brand: BrandConfig;
  agent: AgentInfo;
  daysRemaining: number;
}

const SmartOneDashboard: React.FC<DashboardProps> = ({ brand, agent, daysRemaining }) => {
  const [lastScan, setLastScan] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setLastScan(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} PM Today`);
  }, []);

  const protectionColorClass = daysRemaining <= 15 ? 'text-orange-500' : 'text-blue-600';
  const protectionStatusLabel = daysRemaining <= 15 ? 'Protection Period Concluding Soon' : 'Active Protection';

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* HEADER - Calm, Institutional */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-100 pb-10 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-xs">S1</div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">The Ongoing Protection of Ownership</p>
          </div>
          <h2 className="font-header text-3xl text-slate-900 tracking-tighter mb-1">
            {REAL_PROPERTY_MOCK.address}
          </h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <p className="text-sm font-bold text-slate-500">Ownership Ledger Verified & Current</p>
          </div>
        </div>
        
        <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 flex items-center gap-6 shadow-sm min-w-[240px]">
           <div className="flex-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{protectionStatusLabel}</p>
              <p className={`text-lg font-black leading-none ${protectionColorClass}`}>{daysRemaining} Days Remaining</p>
           </div>
           <div className="w-12 h-12 rounded-full border-4 border-slate-200 flex items-center justify-center relative bg-white">
              <svg className={`absolute inset-0 w-full h-full -rotate-90 ${daysRemaining <= 15 ? 'text-orange-400' : 'text-blue-500'}`} viewBox="0 0 36 36">
                <path
                  className="stroke-current"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray={`${(daysRemaining / 90) * 100}, 100`}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="text-[10px] font-black text-slate-900 z-10">{Math.round((daysRemaining / 90) * 100)}%</span>
           </div>
        </div>
      </div>

      {/* MODULE 1: TITLE SHIELD (Primary Anchor) */}
      <section className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-sm">
         <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-gradient-to-br from-white to-slate-50/50">
            <div className="lg:col-span-4 border-r border-slate-100 pr-8">
               <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
               </div>
               <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Title Shield Active</h3>
               <p className="text-slate-500 text-sm leading-relaxed mb-6">Continuous public record monitoring initiated across all state and local databases.</p>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-bold uppercase tracking-widest">Public Records</span>
                     <span className="font-black text-green-600">VERIFIED</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-bold uppercase tracking-widest">Threat Detection</span>
                     <span className="font-black text-slate-900">SECURE</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-slate-400 font-bold uppercase tracking-widest">Unauthorized Liens</span>
                     <span className="font-black text-slate-900">0</span>
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-8">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Security Activity Journal</h4>
                  <p className="text-[10px] font-mono text-slate-400">LAST SYNC: {lastScan}</p>
               </div>
               <div className="space-y-6">
                  <div className="flex gap-6 items-start pb-6 border-b border-slate-50">
                     <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 shrink-0"></div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">Deed Integrity Verified</p>
                        <p className="text-xs text-slate-500 mt-1 italic">Full cryptographic scan of County Record Vol 2025-118-A. Chain remains intact.</p>
                     </div>
                     <span className="ml-auto text-[9px] font-mono text-slate-400">14:15 PM</span>
                  </div>
                  <div className="flex gap-6 items-start pb-6 border-b border-slate-50">
                     <div className="w-2 h-2 rounded-full bg-slate-200 mt-1 shrink-0"></div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">Ownership Identity Match</p>
                        <p className="text-xs text-slate-500 mt-1">Confirmed recorded owner as {REAL_PROPERTY_MOCK.buyerName}.</p>
                     </div>
                     <span className="ml-auto text-[9px] font-mono text-slate-400">11:30 AM</span>
                  </div>
                  <div className="flex gap-6 items-start">
                     <div className="w-2 h-2 rounded-full bg-slate-200 mt-1 shrink-0"></div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">Sync Completed</p>
                        <p className="text-xs text-slate-500 mt-1">Delaware County Auditor public record portal synchronization verified.</p>
                     </div>
                     <span className="ml-auto text-[9px] font-mono text-slate-400">09:15 AM</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* MODULE 2: OWNERSHIP TRANSITION SERVICES */}
      <section>
        <div className="flex flex-col mb-8">
           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Ownership Transition Services</h3>
           <p className="text-sm text-slate-600 font-medium">Curated activation of essential services based on your Smart closing review.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <TransitionCard 
              logo={<div className="bg-slate-900 text-white rounded p-1 text-[8px] font-black">FIBER</div>}
              name="Fiber Internet & Web"
              description="High-speed fiber activation for new residents."
              cost="$65.00/mo"
              badge="Smart Recommended"
           />
           <TransitionCard 
              logo={<div className="bg-slate-200 rounded p-1 text-[8px] font-black">UTILITY</div>}
              name="Power & Gas Coordination"
              description="One-click transfer of residential service accounts."
              cost="Market Rate"
           />
           <TransitionCard 
              logo={<div className="bg-blue-600 text-white rounded p-1 text-[8px] font-black">SECURE</div>}
              name="Advanced Home Security"
              description="Professional installation of monitoring systems."
              cost="$45.00/mo"
           />
        </div>
      </section>

      {/* MODULE 3: VERIFIED EQUITY REVIEW & CAPITAL ACCESS */}
      <section className="bg-slate-900 rounded-[40px] p-10 md:p-16 text-white overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
         <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
               <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">Verified Equity Position</p>
            </div>
            <h3 className="text-4xl md:text-5xl font-header tracking-tighter mb-6 leading-none">
              Equity Review Available
            </h3>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
              Based on your verified ownership and lien position, you qualify for structured capital access of up to <span className="text-white font-bold">$35,000</span> for home improvements.
            </p>
            <div className="flex flex-wrap gap-6">
               <button className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95 hover:bg-slate-100">
                  Review Options
               </button>
               <div className="flex items-center gap-3">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Underwritten securely via Smart ONE Capital</p>
               </div>
            </div>
         </div>
      </section>

      {/* MODULE 4 & 5: RECORDS VAULT & INTELLIGENCE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* MODULE 4: CERTIFIED RECORDS VAULT */}
         <section>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-l-2 pl-4 border-slate-900">Certified Records Vault</h3>
            <div className="space-y-4">
               <RecordItem name="Digital Warranty Deed" verified />
               <RecordItem name="Title Insurance Policy" verified />
               <RecordItem name="Certified Closing Disclosure" verified />
               <RecordItem name="Parcel Map & Survey" />
            </div>
         </section>

         {/* MODULE 5: OWNERSHIP INTELLIGENCE */}
         <section>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-l-2 pl-4 border-slate-900">Ownership Intelligence</h3>
            <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-200">
               <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-200">
                  <div>
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Est. Property Value</p>
                     <p className="text-2xl font-black text-slate-900">${(REAL_PROPERTY_MOCK.salePrice + 12500).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Equity Progress</p>
                     <p className="text-2xl font-black text-slate-900">22.4%</p>
                  </div>
               </div>
               
               <div className="space-y-6">
                  <IntelligenceItem title="Tax Assessment Audit" description="Schedule your annual property tax review." action="View Schedule" />
                  <IntelligenceItem title="Maintenance Stewardship" description="System audit due in 6 months." action="Audit Details" />
               </div>
            </div>
         </section>
      </div>

    </div>
  );
};

// HELPER COMPONENTS

const TransitionCard: React.FC<{ logo: React.ReactNode, name: string, description: string, cost: string, badge?: string }> = ({ logo, name, description, cost, badge }) => (
  <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:border-slate-300 hover:shadow-xl cursor-pointer flex flex-col h-full group">
    <div className="flex justify-between items-start mb-6">
       <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-transform group-hover:scale-110">
          {logo}
       </div>
       {badge && <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">{badge}</span>}
    </div>
    <h4 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-tight">{name}</h4>
    <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6 flex-1">{description}</p>
    <div className="flex justify-between items-center pt-4 border-t border-slate-50">
       <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{cost}</span>
       <button className="text-[10px] font-black text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Activate</button>
    </div>
  </div>
);

const RecordItem: React.FC<{ name: string, verified?: boolean }> = ({ name, verified }) => (
  <div className="flex justify-between items-center p-5 bg-white border border-slate-100 rounded-2xl hover:border-slate-300 transition-all cursor-pointer shadow-sm group">
     <div className="flex items-center gap-4">
        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span className="text-sm font-bold text-slate-700">{name}</span>
     </div>
     <div className="flex items-center gap-4">
        {verified && <span className="text-[8px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1">
           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
           Verified
        </span>}
        <svg className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
     </div>
  </div>
);

const IntelligenceItem: React.FC<{ title: string, description: string, action: string }> = ({ title, description, action }) => (
  <div className="flex flex-col gap-1">
     <div className="flex justify-between items-center">
        <p className="text-sm font-bold text-slate-900">{title}</p>
        <button className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-800 transition-colors">{action}</button>
     </div>
     <p className="text-xs text-slate-500 font-medium">{description}</p>
  </div>
);

export default SmartOneDashboard;
