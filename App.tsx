
import React, { useState } from 'react';
import Layout from './components/Layout';
import { TransactionContent } from './components/TransactionSteps';
import SmartOneDashboard from './components/SmartOneDashboard';
import AgentTransparencyView from './components/AgentTransparencyView';
import ChatWidget from './components/ChatWidget';
import { TransactionStep, BrandConfig, ViewMode, ExperienceLevel } from './types';
import { WCT_BRAND, MOCK_AGENT, REAL_PROPERTY_MOCK } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TransactionStep>(TransactionStep.STARTED);
  const [brand] = useState<BrandConfig>(WCT_BRAND);
  const [viewMode, setViewMode] = useState<ViewMode>('buyer');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
  const [inDashboard, setInDashboard] = useState(false);
  const [simulatedDays, setSimulatedDays] = useState(90);
  
  // Extract first name for greeting
  const buyerFirstName = REAL_PROPERTY_MOCK.buyerName.split(' ')[0].split('&')[0].trim();
  const formattedFirstName = buyerFirstName.charAt(0).toUpperCase() + buyerFirstName.slice(1).toLowerCase();

  // Quote Opt-ins
  const [optInInsurance, setOptInInsurance] = useState(false);

  const handleNext = () => {
    if (currentStep === TransactionStep.CLOSED) {
      setInDashboard(true);
    } else {
      setCurrentStep((prev) => Math.min(prev + 1, TransactionStep.CLOSED) as TransactionStep);
    }
  };

  const handleBack = () => {
    if (inDashboard) {
      setInDashboard(false);
      setCurrentStep(TransactionStep.CLOSED);
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, TransactionStep.STARTED) as TransactionStep);
    }
  };

  const simulateDay75 = () => {
    setSimulatedDays(15);
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'buyer' ? 'agent' : 'buyer');
  };

  if (!experienceLevel && viewMode === 'buyer') {
    return (
      <div className="fixed inset-0 bg-white z-[200] flex flex-col md:flex-row overflow-hidden animate-in fade-in duration-700">
        {/* Verification Sidebar (Desktop) / Header (Mobile) */}
        <aside className="w-full md:w-80 bg-white md:bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col p-6 md:p-10 shrink-0 z-20">
          <div className="mb-4 md:mb-12">
            <h1 
              className="font-header uppercase-tracking-150 text-xl md:text-2xl leading-none mb-1" 
              style={{ color: brand.primaryColor }}
            >
              {brand.logoName}
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Transaction ONE Portal</p>
          </div>

          {/* Desktop Only Side Info */}
          <div className="hidden md:block mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Secure Link Verified</p>
            </div>
            <p className="text-sm font-black text-slate-900 leading-tight">
              {REAL_PROPERTY_MOCK.address}
            </p>
            <p className="text-[10px] font-bold text-slate-400 mt-0.5">{REAL_PROPERTY_MOCK.cityStateZip}</p>
          </div>

          {/* Desktop Only Agent Card */}
          <div className="mt-auto pt-8 hidden md:block">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 transition-all group-hover:w-full group-hover:opacity-5"></div>
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Your Agent</p>
               <div className="flex items-center gap-4 mb-5">
                  <img 
                    src={MOCK_AGENT.image} 
                    alt={MOCK_AGENT.name} 
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                  />
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-tight">{MOCK_AGENT.name}</p>
                    <p className="text-[10px] font-bold text-slate-400">{MOCK_AGENT.brokerage}</p>
                  </div>
               </div>
               <div className="flex gap-2 relative z-10">
                  <button 
                    className="flex-1 py-2 text-[10px] font-black rounded-lg border uppercase tracking-widest transition-all hover:bg-slate-50"
                    style={{ borderColor: brand.accentColor, color: brand.primaryColor }}
                    onClick={() => window.location.href = `tel:${MOCK_AGENT.phone}`}
                  >
                    CALL
                  </button>
                  <button 
                    className="flex-1 py-2 text-[10px] font-black rounded-lg text-white uppercase tracking-widest transition-all shadow-md active:scale-95"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    SMS
                  </button>
               </div>
            </div>
          </div>
        </aside>

        {/* Experience Selection Main Area */}
        <main className="flex-1 overflow-y-auto bg-white flex flex-col items-center p-6 md:p-20 pb-32 md:pb-20">
          <div className="max-w-2xl w-full my-auto pt-4 md:pt-12">
            <div className="mb-10 text-center md:text-left">
              <h1 className="text-slate-900 font-header text-4xl md:text-6xl tracking-tighter mb-4 leading-tight">
                Welcome, {formattedFirstName}
              </h1>
              <p className="text-slate-500 font-medium text-base md:text-xl leading-relaxed max-w-xl">
                Ready to begin your journey to <span className="text-slate-900 font-bold">{REAL_PROPERTY_MOCK.address.split(' ')[1]} {REAL_PROPERTY_MOCK.address.split(' ')[2]}</span>. Choose the transparency level that suits you best.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 w-full mb-12">
              <PreferenceCard 
                title="Simple" 
                subtitle="High-level status updates. Just tell me what I need to do next." 
                icon="⚡"
                brand={brand}
                onClick={() => setExperienceLevel('simple')}
              />
              <PreferenceCard 
                title="Standard" 
                subtitle="The recommended experience. Balanced context and helpful guidance." 
                icon="✨"
                brand={brand}
                onClick={() => setExperienceLevel('standard')}
              />
              <PreferenceCard 
                title="Complete" 
                subtitle="Deep dive transparency. Professional legal and curative detail." 
                icon="🛡️"
                brand={brand}
                onClick={() => setExperienceLevel('complete')}
              />
            </div>

            {/* Centered mobile agent access button for mobile consistency */}
            <div className="flex flex-col items-center text-center border-t border-slate-100 pt-8 gap-4 mb-8">
              <button 
                onClick={toggleViewMode}
                className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-600 transition-colors border-b border-transparent hover:border-slate-300 pb-1"
              >
                Closer / Agent Login
              </button>
              <p className="text-[8px] text-slate-300 font-medium italic">Secure Multi-Party Closing Protocol v2.5 • Powell, OH</p>
            </div>
          </div>
        </main>

        {/* Mobile Agent Footer (Sticky) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-3 flex items-center justify-between z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl bg-white/80">
          <div className="flex items-center gap-3">
              <img src={MOCK_AGENT.image} className="w-10 h-10 rounded-xl border border-slate-100 shadow-sm object-cover" alt={MOCK_AGENT.name} />
              <div className="flex flex-col text-left">
                <p className="font-black text-slate-900 text-xs uppercase tracking-tighter">{MOCK_AGENT.name}</p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">WCT Steward</p>
              </div>
          </div>
          <div className="flex gap-2">
            <button 
                className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600"
                onClick={() => window.location.href = `tel:${MOCK_AGENT.phone}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            <button 
                className="px-4 py-2 rounded-xl text-white text-[10px] font-black uppercase tracking-widest shadow-md transition-all active:scale-95"
                style={{ backgroundColor: brand.primaryColor }}
              >
                SMS
              </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout 
      brand={brand} 
      agent={MOCK_AGENT} 
      propertyAddress={`${REAL_PROPERTY_MOCK.address}`}
    >
      {/* Simulation Helper - Only in Dashboard */}
      {inDashboard && viewMode === 'buyer' && (
         <div className="fixed top-2 md:top-4 right-2 md:right-4 z-[100]">
           <button 
            onClick={simulateDay75}
            className="px-3 py-1.5 md:px-4 md:py-2 bg-slate-900/10 hover:bg-slate-900 text-slate-900 hover:text-white text-[9px] font-black uppercase tracking-widest rounded-full transition-all border border-slate-900/20 shadow-sm backdrop-blur-md"
          >
            Simulate Day 75
          </button>
         </div>
      )}

      {/* Subtle Bottom-Center Portal Switch - Precisely center-aligned at bottom of screen on mobile */}
      <div className="fixed bottom-20 md:bottom-4 left-1/2 -translate-x-1/2 z-[100] w-full flex justify-center pointer-events-none px-4">
        <button 
            onClick={toggleViewMode}
            className="pointer-events-auto px-6 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-full transition-all border border-slate-200 shadow-xl backdrop-blur-xl bg-white/90 text-slate-400 hover:text-slate-900 hover:border-slate-400"
          >
            {viewMode === 'agent' ? 'Return to Buyer Journey' : 'Agent Access Portal'}
          </button>
      </div>

      {viewMode === 'agent' ? (
        <AgentTransparencyView 
          brand={brand} 
          currentStep={currentStep} 
        />
      ) : !inDashboard ? (
        <TransactionContent 
          step={currentStep} 
          brand={brand} 
          onNext={handleNext} 
          onBack={handleBack}
          experienceLevel={experienceLevel || 'standard'}
          optInInsurance={optInInsurance}
          setOptInInsurance={setOptInInsurance}
        />
      ) : (
        <SmartOneDashboard 
          brand={brand} 
          agent={MOCK_AGENT} 
          daysRemaining={simulatedDays}
        />
      )}

      {viewMode === 'buyer' && <ChatWidget brand={brand} />}
    </Layout>
  );
};

const PreferenceCard = ({ title, subtitle, icon, brand, onClick }: { title: string, subtitle: string, icon: string, brand: BrandConfig, onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group p-6 md:p-8 bg-white border-2 rounded-[2rem] text-left transition-all active:scale-[0.98] flex items-center gap-6 shadow-sm relative overflow-hidden"
      style={{ 
        borderColor: isHovered ? brand.primaryColor : '#F1F5F9', // slate-100
        backgroundColor: isHovered ? `${brand.primaryColor}05` : 'white',
        boxShadow: isHovered ? `0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)` : undefined
      }} 
    >
      <div className={`text-3xl md:text-4xl transition-all duration-300 ${isHovered ? 'scale-110 grayscale-0' : 'grayscale'}`}>
        {icon}
      </div>
      <div className="flex-1 pr-6">
        <p className="text-xl md:text-2xl font-black text-slate-900 mb-1 tracking-tight">
          {title}
        </p>
        <p className="text-xs md:text-sm text-slate-600 font-bold leading-snug">
          {subtitle}
        </p>
      </div>
      
      {/* Visual indicator of interactivity */}
      <div className={`transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} style={{ color: brand.primaryColor }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </div>

      {/* Subtle selection line */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: brand.primaryColor }}
      />
    </button>
  );
};

export default App;
