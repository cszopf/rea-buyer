
import React, { useState } from 'react';
import Layout from './components/Layout';
import { TransactionContent } from './components/TransactionSteps';
import SmartOneDashboard from './components/SmartOneDashboard';
import AgentTransparencyView from './components/AgentTransparencyView';
import ChatWidget from './components/ChatWidget';
import { TransactionStep, BrandConfig, ViewMode } from './types';
import { WCT_BRAND, MOCK_AGENT, REAL_PROPERTY_MOCK } from './constants';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TransactionStep>(TransactionStep.STARTED);
  const [brand] = useState<BrandConfig>(WCT_BRAND);
  const [viewMode, setViewMode] = useState<ViewMode>('buyer');
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

  return (
    <Layout 
      brand={brand} 
      agent={MOCK_AGENT} 
      propertyAddress={`${REAL_PROPERTY_MOCK.address} | ${REAL_PROPERTY_MOCK.cityStateZip}`}
    >
      {/* Simulation Helpers */}
      <div className="fixed top-4 right-4 z-[100] flex gap-3">
         {inDashboard && (
           <button 
            onClick={simulateDay75}
            className="px-4 py-2 bg-slate-900/10 hover:bg-slate-900 text-slate-900 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-full transition-all border border-slate-900/20 shadow-sm backdrop-blur-md"
          >
            Simulate Day 75
          </button>
         )}
         <button 
            onClick={toggleViewMode}
            className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full transition-all border shadow-sm backdrop-blur-md
              ${viewMode === 'agent' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'}`}
          >
            {viewMode === 'agent' ? 'Return to Buyer View' : 'Switch to Agent Portal'}
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

export default App;
