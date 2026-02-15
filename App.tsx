
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
           <div className="mb-12">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-8 flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-slate-900 font-header text-3xl md:text-4xl tracking-tighter mb-4 px-4 leading-tight">Tailor your closing experience</h1>
              <p className="text-slate-500 font-medium px-8 text-sm md:text-base">Choose how much technical and legal detail you'd like to see throughout your transaction.</p>
           </div>
           
           <div className="grid grid-cols-1 gap-4 w-full">
              <PreferenceCard 
                title="Simple" 
                subtitle="High-level status updates. Just tell me what I need to do next." 
                icon="⚡"
                onClick={() => setExperienceLevel('simple')}
              />
              <PreferenceCard 
                title="Standard" 
                subtitle="The recommended experience. Balanced context and guidance." 
                icon="✨"
                onClick={() => setExperienceLevel('standard')}
              />
              <PreferenceCard 
                title="Complete" 
                subtitle="Deep dive transparency. Professional legal and curative detail." 
                icon="🛡️"
                onClick={() => setExperienceLevel('complete')}
              />
           </div>

           <button 
              onClick={toggleViewMode}
              className="mt-16 text-[9px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-600 transition-colors"
           >
              Agent Login
           </button>
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

const PreferenceCard = ({ title, subtitle, icon, onClick }: { title: string, subtitle: string, icon: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="group p-6 bg-white border border-slate-100 rounded-[2rem] text-left hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-500/10 transition-all active:scale-[0.98] flex items-center gap-6"
  >
    <div className="text-3xl grayscale group-hover:grayscale-0 transition-all">{icon}</div>
    <div>
      <p className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors tracking-tight">{title}</p>
      <p className="text-xs md:text-sm text-slate-500 font-medium leading-snug">{subtitle}</p>
    </div>
  </button>
);

export default App;
