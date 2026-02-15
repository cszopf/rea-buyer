
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
  
  // Quote Opt-ins
  const [optInInsurance, setOptInInsurance] = useState(false);
  const [optInMortgage, setOptInMortgage] = useState(false);

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
      <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700 overflow-y-auto">
        <div className="max-w-xl w-full py-12">
           <div className="mb-12 flex flex-col items-center">
              {/* White-labeled Branding Text */}
              <div className="mb-6">
                <h1 
                  className="font-header uppercase-tracking-150 text-2xl md:text-3xl leading-none mb-1" 
                  style={{ color: brand.primaryColor }}
                >
                  {brand.logoName}
                </h1>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Transaction ONE Portal</p>
              </div>
              
              <h1 className="text-slate-900 font-header text-3xl md:text-4xl tracking-tighter mb-4 px-4 leading-tight">
                Tailor your closing experience
              </h1>
              <p className="text-slate-500 font-medium px-8 text-sm md:text-base">
                Choose the level of transparency and technical detail you'd like throughout your journey with <span style={{ color: brand.primaryColor }} className="font-bold">{brand.logoName}</span>.
              </p>
           </div>
           
           <div className="grid grid-cols-1 gap-4 w-full">
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

           <div className="mt-16 flex flex-col items-center gap-4">
             <button 
                onClick={toggleViewMode}
                className="text-[9px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-600 transition-colors border-b border-transparent hover:border-slate-300 pb-1"
             >
                Closer / Agent Login
             </button>
             <p className="text-[8px] text-slate-300 font-medium italic">Secure Multi-Party Closing Protocol v2.5</p>
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

      {/* Subtle Bottom-Center Portal Switch */}
      <div className="fixed bottom-[72px] md:bottom-4 left-1/2 -translate-x-1/2 z-[100]">
        <button 
            onClick={toggleViewMode}
            className="px-3 py-1.5 md:px-4 md:py-2 text-[8px] font-black uppercase tracking-widest rounded-full transition-all border border-slate-100 shadow-sm backdrop-blur-md bg-white/40 text-slate-300 hover:text-slate-900 hover:bg-white hover:border-slate-200"
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
          optInMortgage={optInMortgage}
          setOptInMortgage={setOptInMortgage}
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

const PreferenceCard = ({ title, subtitle, icon, brand, onClick }: { title: string, subtitle: string, icon: string, brand: BrandConfig, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="group p-6 bg-white border border-slate-100 rounded-[2rem] text-left hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-900/5 transition-all active:scale-[0.98] flex items-center gap-6"
    style={{ borderColor: 'transparent' }} 
  >
    <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{icon}</div>
    <div>
      <p className="text-xl font-black text-slate-900 mb-1 group-hover:transition-colors tracking-tight" style={{ color: 'inherit' }}>
        <span className="group-hover:text-blue-600 transition-colors" style={{ color: brand.primaryColor }}>{title}</span>
      </p>
      <p className="text-xs md:text-sm text-slate-500 font-medium leading-snug">{subtitle}</p>
    </div>
  </button>
);

export default App;
