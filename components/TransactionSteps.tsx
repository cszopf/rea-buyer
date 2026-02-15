
import React, { useState } from 'react';
import { TransactionStep, BrandConfig, Document, TitleIssue } from '../types';
import { REAL_PROPERTY_MOCK } from '../constants';

interface StepProps {
  step: TransactionStep;
  brand: BrandConfig;
  onNext: () => void;
  onBack?: () => void;
  optInInsurance?: boolean;
  setOptInInsurance?: (val: boolean) => void;
  optInMortgage?: boolean;
  setOptInMortgage?: (val: boolean) => void;
}

const ExpectationBox: React.FC<{ title: string; description: string; estTime: string; brand: BrandConfig }> = ({ title, description, estTime, brand }) => (
  <div className="mt-12 p-6 bg-slate-50 border-l-4 border-slate-900 rounded-r-2xl shadow-sm animate-in fade-in slide-in-from-left-4 duration-1000">
    <div className="flex justify-between items-start mb-2">
      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Radical Transparency: What to expect</h4>
      <span className="text-[10px] font-black uppercase tracking-tighter bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-900 shadow-sm flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Current Phase Duration: {estTime}
      </span>
    </div>
    <p className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-tight">{title}</p>
    <p className="text-xs text-slate-600 leading-relaxed italic">{description}</p>
  </div>
);

const StepHeader: React.FC<{ title: string; subtitle: string; brand: BrandConfig; stepNum: number }> = ({ title, subtitle, brand, stepNum }) => (
  <div className="mb-10">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-slate-900" style={{ backgroundColor: brand.accentColor }}>Step {stepNum} of 8</span>
      <span className="text-xs font-bold text-slate-500">Transaction Phase</span>
    </div>
    <h2 className="font-header uppercase-tracking-150 text-4xl mb-3" style={{ color: brand.primaryColor }}>
      {title}
    </h2>
    <p className="font-subheader text-slate-600 text-lg leading-relaxed">
      {subtitle}
    </p>
  </div>
);

const Button: React.FC<{ label: string; onClick: () => void; primary?: boolean; brand: BrandConfig; className?: string }> = ({ label, onClick, primary, brand, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-8 py-4 rounded font-bold text-sm tracking-widest uppercase transition-all shadow-sm active:scale-95 ${className}`}
    style={{
      backgroundColor: primary ? brand.primaryColor : 'transparent',
      color: primary ? 'white' : brand.primaryColor,
      border: primary ? 'none' : `2px solid ${brand.accentColor}`
    }}
  >
    {label}
  </button>
);

const NavActions: React.FC<{ onNext: () => void; onBack?: () => void; brand: BrandConfig; nextLabel?: string; showBack?: boolean }> = ({ onNext, onBack, brand, nextLabel = "Continue", showBack = true }) => (
  <div className="flex flex-wrap gap-4 mt-8 pb-10">
    {showBack && onBack && (
      <Button label="Back" onClick={onBack} brand={brand} />
    )}
    <Button label={nextLabel} onClick={onNext} primary brand={brand} />
  </div>
);

export const TransactionContent: React.FC<StepProps> = ({ 
  step, brand, onNext, onBack, 
  optInInsurance, setOptInInsurance, 
  optInMortgage, setOptInMortgage 
}) => {
  const [showWireInstructions, setShowWireInstructions] = useState(false);

  switch (step) {
    case TransactionStep.STARTED:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={1}
            title="Transaction Started" 
            subtitle={`We are processing File #${REAL_PROPERTY_MOCK.parcelId} for the purchase of ${REAL_PROPERTY_MOCK.address}.`} 
            brand={brand} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-[10px] font-black text-slate-400 uppercase">Sale Price</p>
              <p className="font-bold text-slate-800 text-lg">${REAL_PROPERTY_MOCK.salePrice.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-[10px] font-black text-slate-400 uppercase">Lender</p>
              <p className="font-bold text-slate-800 text-lg">{REAL_PROPERTY_MOCK.lender}</p>
            </div>
          </div>
          <ExpectationBox 
            title="File Setup & Compliance" 
            estTime="Immediate" 
            description="Our compliance team is currently mapping your purchase contract to local statutory requirements, ensuring every contingency date is tracked and secured."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} showBack={false} nextLabel="Confirm Details" />
        </div>
      );

    case TransactionStep.IDENTITY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={2}
            title="Verify Identity" 
            subtitle={`Secure Biometric verification required for ${REAL_PROPERTY_MOCK.buyerName}.`} 
            brand={brand} 
          />
          <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-2xl mb-8">
             <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                   </svg>
                </div>
                <div>
                   <p className="font-bold text-slate-800">Advanced Security Protocol</p>
                   <p className="text-sm text-slate-600">Encrypted identity matching with Delaware County Auditor records.</p>
                </div>
             </div>
          </div>
          <ExpectationBox 
            title="Identity Shielding" 
            estTime="5 Mins" 
            description="We use government-grade biometric matching to ensure the person signing is exactly who they claim to be. This eliminates 99.9% of identity-based wire fraud risks."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Start Verification" />
        </div>
      );

    case TransactionStep.DOCUMENTS:
      const documentsList = [
        { name: "Executed Purchase Contract", ref: "EPC-2510", type: "PDF", size: "2.4 MB" },
        { name: "Signed Addendum dated 2/12/26", ref: "ADD-01", type: "PDF", size: "1.1 MB" },
        { name: "Title Commitment", ref: "WCT-COMMIT", type: "PDF", size: "1.8 MB" },
        { name: "Lender Closing Instructions", ref: "L-9372", type: "PDF", size: "850 KB" },
        { name: "Buyer Information Sheet", ref: "REQUIRED", type: "FORM", urgent: true },
        { name: "Insurance Dec Page", ref: "MISSING", type: "UPLOAD", missing: true, note: "Need to upload or use our partner program below" }
      ];

      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
          <StepHeader 
            stepNum={3}
            title="Document Collection" 
            subtitle="Please review your current closing package. Securely view, download, or complete necessary filings below." 
            brand={brand} 
          />
          
          <div className="mb-10">
            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Document Vault</h4>
            <div className="space-y-3">
              {documentsList.map((doc, idx) => (
                <div key={idx} className={`p-4 bg-white border rounded-xl flex items-center justify-between shadow-sm transition-all hover:shadow-md ${doc.urgent ? 'border-orange-200 bg-orange-50/20' : doc.missing ? 'border-red-200 bg-red-50/10' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-12 rounded flex flex-col items-center justify-center text-[8px] font-black ${doc.type === 'PDF' ? 'bg-red-50 text-red-500 border border-red-100' : doc.type === 'FORM' ? 'bg-blue-50 text-blue-500 border border-blue-100' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {doc.type}
                    </div>
                    <div>
                      <p className={`text-sm font-bold ${doc.missing ? 'text-red-700' : 'text-slate-900'}`}>{doc.name}</p>
                      <div className="flex flex-col">
                        <p className="text-[10px] text-slate-500 font-mono">ID: {doc.ref} {doc.size && `• ${doc.size}`}</p>
                        {doc.note && <p className="text-[10px] text-red-500 font-bold mt-0.5">{doc.note}</p>}
                      </div>
                    </div>
                  </div>
                  <button className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded transition-colors ${doc.urgent ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm' : doc.missing ? 'bg-red-600 text-white hover:bg-red-700 shadow-sm' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {doc.urgent ? 'Complete' : doc.missing ? 'Upload Now' : 'View'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl shadow-inner mb-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-xs font-black uppercase text-slate-900 mb-1 tracking-widest">WCT Smart Quote Services</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Complimentary marketplace access. Compare rates and save on your new property.
                </p>
              </div>
              <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter shrink-0">Free Service</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-slate-300">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#ff0083] rounded-xl flex items-center justify-center border border-[#ff0083] shadow-md shrink-0">
                       <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                       </svg>
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                         Homeowner Insurance
                         <span className="text-[9px] bg-[#ff0083]/10 text-[#ff0083] px-1.5 py-0.5 rounded-full uppercase font-black">Lemonade Partner</span>
                       </p>
                       <p className="text-xs text-slate-500 mt-1 leading-snug">Instant quotes and digital binding. Solve the "Missing Dec Page" in 90 seconds.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 shrink-0">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter cursor-pointer hidden sm:block" htmlFor="optInInsurance">Get Quote</label>
                    <input 
                        id="optInInsurance"
                        type="checkbox" 
                        className="w-7 h-7 rounded-lg accent-[#ff0083] cursor-pointer shadow-sm"
                        checked={optInInsurance}
                        onChange={(e) => setOptInInsurance?.(e.target.checked)}
                    />
                 </div>
              </div>

              <div className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:border-slate-300">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white border border-blue-500 shadow-md shrink-0">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                       </svg>
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                         Mortgage Competition
                         <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full uppercase font-black tracking-tighter">Marketplace</span>
                       </p>
                       <p className="text-xs text-slate-500 mt-1 leading-snug">Lenders (including {REAL_PROPERTY_MOCK.lender}) compete for your business. Non-binding pre-approval available.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 shrink-0">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter cursor-pointer hidden sm:block" htmlFor="optInMortgage">Invite Bids</label>
                    <input 
                        id="optInMortgage"
                        type="checkbox" 
                        className="w-7 h-7 rounded-lg accent-blue-600 cursor-pointer shadow-sm"
                        checked={optInMortgage}
                        onChange={(e) => setOptInMortgage?.(e.target.checked)}
                    />
                 </div>
              </div>
            </div>
          </div>
          <ExpectationBox 
            title="Digital Custody & Vault" 
            estTime="Continuous" 
            description="Your documents are stored in an AES-256 encrypted vault. We are meticulously auditing each signature to ensure your loan is legally fundable and state-compliant."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Review Package" />
        </div>
      );

    case TransactionStep.SEARCH:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={4}
            title="Digital Title Examination" 
            subtitle="Our examiners have verified a clear path to ownership by reviewing 40+ years of public records." 
            brand={brand} 
          />
          <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden mb-8">
             <div className="p-6 border-b border-slate-200 bg-white">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Exam History</p>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-800">
                   <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                     <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                   </div>
                   Franklin County Auditor Records Matched
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-800 mt-4">
                   <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                     <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                   </div>
                   Prior Lien Release Verified (Chase Bank)
                </div>
             </div>
             <div className="p-6 bg-slate-50/50">
                <p className="text-xs text-slate-600 italic">"Examiner Note: A standard utility easement per Plat Vol 45, Pg 112 was noted. This is typical for Powell residential plots and does not affect marketability of title."</p>
             </div>
          </div>
          <ExpectationBox 
            title="The 40-Year Legal Exam" 
            estTime="48-72 Hours" 
            description="Our examiners search the land's history for 'ghost liens' and ancient easements. We don't just verify names; we ensure the physical parcel is free of hidden claims before you own it."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Confirm Search" />
        </div>
      );

    case TransactionStep.CLEARING:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={5}
            title="Curative Phase" 
            subtitle="We are finalizing the payoff and tax certificates to ensure a clean transfer." 
            brand={brand} 
          />
          <div className="space-y-4 mb-8">
            <div className="p-5 border border-slate-200 rounded-xl flex justify-between items-center bg-white shadow-sm">
              <span className="font-bold text-slate-800 text-sm">County Auditor Transfer Fee</span>
              <span className="text-green-600 font-black text-[10px] uppercase bg-green-50 px-3 py-1 rounded-full">Cleared</span>
            </div>
            <div className="p-5 border border-slate-200 rounded-xl flex justify-between items-center bg-white shadow-sm">
              <span className="font-bold text-slate-800 text-sm">HOA Status Letter (Wedgewood)</span>
              <span className="text-orange-500 font-black text-[10px] uppercase bg-orange-50 px-3 py-1 rounded-full">Finalizing</span>
            </div>
            <div className="p-5 border border-slate-200 rounded-xl flex justify-between items-center bg-white shadow-sm">
              <span className="font-bold text-slate-800 text-sm">Escrow Holdback Agreement</span>
              <span className="text-blue-600 font-black text-[10px] uppercase bg-blue-50 px-3 py-1 rounded-full">In Review</span>
            </div>
          </div>
          <ExpectationBox 
            title="Financial Sovereignty" 
            estTime="3-5 Days" 
            description="We are coordinating with current lienholders to ensure their debts are paid in full. This guarantees you are handed a 'free and clear' title the moment your deed is recorded."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} />
        </div>
      );

    case TransactionStep.SCHEDULE:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={6}
            title="Signing Coordinator" 
            subtitle={`Closing is officially targeted for ${REAL_PROPERTY_MOCK.closingDate}. Please select your preferred signing environment.`} 
            brand={brand} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-8 border-2 border-blue-100 bg-blue-50/20 rounded-3xl cursor-pointer hover:border-blue-400 transition-all shadow-sm group">
              <div className="w-12 h-12 bg-white rounded-2xl mb-4 flex items-center justify-center text-blue-600 shadow-sm transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="font-black text-slate-900 mb-1 uppercase tracking-tighter">In-Office (Westerville)</p>
              <p className="text-xs text-slate-600">5040 Pine Creek Drive, Westerville, OH 43081. Full notary support onsite.</p>
            </div>
            <div className="p-8 border-2 border-slate-100 rounded-3xl opacity-60 cursor-not-allowed bg-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                 <span className="text-[8px] font-black text-slate-400 bg-slate-200 px-2 py-0.5 rounded-full uppercase">Coming Soon</span>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl mb-4 flex items-center justify-center text-slate-400 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-black text-slate-900 mb-1 uppercase tracking-tighter">RON (Digital Signing)</p>
              <p className="text-xs text-slate-400">Remote Online Notarization. Currently restricted by Lender guidelines.</p>
            </div>
          </div>
          <ExpectationBox 
            title="Legal Witnessing & Execution" 
            estTime="60 Mins" 
            description="A state-certified notary will witness your wet-ink signatures. This ceremony provides the final layer of legal validity required for a secure property transfer in the State of Ohio."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Schedule Time" />
        </div>
      );

    case TransactionStep.SUMMARY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl mx-auto pb-20">
          <div className="flex justify-between items-center mb-8 border-b-4 border-slate-900 pb-4">
             <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Closing Disclosure</h2>
             <div className="text-right">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Digital File Reference</p>
                <p className="text-sm font-bold text-slate-900">{REAL_PROPERTY_MOCK.parcelId}</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
               <p className="text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 pb-1 mb-2 tracking-widest">Loan Information</p>
               <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500">Loan Amount</p>
                    <p className="text-xl font-black text-slate-900">${REAL_PROPERTY_MOCK.loanAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Interest Rate</p>
                    <p className="text-xl font-black text-slate-900">{REAL_PROPERTY_MOCK.interestRate}%</p>
                  </div>
               </div>
            </div>
            <div className="md:col-span-2">
               <p className="text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 pb-1 mb-2 tracking-widest">Projected Payments (Year 1)</p>
               <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center border border-slate-200 shadow-inner">
                  <div>
                    <p className="text-xs text-slate-600 font-semibold">Principal & Interest</p>
                    <p className="text-2xl font-black text-slate-900">$5,915.38 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 font-semibold">Estimated Escrow</p>
                    <p className="text-xl font-black text-slate-900">$1,050.00 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl mb-8">
             <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
               <span className="text-xs font-black uppercase tracking-[0.2em]">Costs at Closing Detail</span>
               <span className="text-[10px] font-bold text-slate-400">Section J & K Summary</span>
             </div>
             <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-b border-slate-100 pb-8 gap-6">
                   <div>
                      <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Closing Costs</h4>
                      <p className="text-5xl font-black text-slate-900 tracking-tighter">$26,755.91</p>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-black px-2 py-0.5 rounded-full uppercase tracking-tighter mt-1 inline-block">Includes $50 Digital Credit</span>
                   </div>
                   <div className="text-right">
                      <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Final Cash to Close</h4>
                      <p className="text-5xl font-black text-blue-600 tracking-tighter">$251,578.04</p>
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Loan Costs (A+B+C)</p>
                        <p className="text-xs font-bold text-slate-800">$7,426.00</p>
                      </div>
                      <div className="space-y-3 px-1">
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">A. Origination Charges (0.25% Points)</span>
                            <span className="font-bold text-slate-800">$2,500.00</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">B. Services Did Not Shop For</span>
                            <span className="font-bold text-slate-800">$902.00</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">C. Services Did Shop For (WCT Settlement)</span>
                            <span className="font-bold text-slate-800">$4,024.00</span>
                         </div>
                      </div>
                   </div>

                   <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Other Costs (E+F+G+H)</p>
                        <p className="text-xs font-bold text-slate-800">$19,329.91</p>
                      </div>
                      <div className="space-y-3 px-1">
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">E. Taxes & Gov Recording Fees</span>
                            <span className="font-bold text-slate-800">$262.50</span>
                         </div>
                         <div className="flex justify-between text-sm items-center">
                            <span className="text-slate-500 flex items-center gap-2">
                              F. Prepaids (Homeowner Insurance)
                              {optInInsurance && <span className="text-[8px] bg-[#ff0083] text-white px-1.5 rounded uppercase font-black tracking-tighter">Lemonade Quote</span>}
                            </span>
                            <span className="font-bold text-slate-800">{optInInsurance ? '$6,538.48' : '$0.00'}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">G. Initial Escrow Payment at Closing</span>
                            <span className="font-bold text-slate-800">$10,084.80</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">H. Other Curative Adjustments</span>
                            <span className="font-bold text-slate-800">$2,494.13</span>
                         </div>
                         {/* Credit line item */}
                         <div className="flex justify-between text-sm pt-2 border-t border-slate-200 mt-2">
                            <span className="text-blue-600 font-bold flex items-center gap-2">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                              WCT Digital Service Credit
                            </span>
                            <span className="font-black text-blue-600">-$50.00</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Secure Wire Instructions Section */}
          <div className="mb-12">
             <button 
                onClick={() => setShowWireInstructions(!showWireInstructions)}
                className="w-full group overflow-hidden rounded-3xl border border-blue-200 bg-blue-50/30 hover:bg-blue-50 transition-all shadow-sm"
             >
                <div className="p-6 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m4-4l-4-4" />
                         </svg>
                      </div>
                      <div className="text-left">
                         <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-0.5">WCT Secure Financial Operations</p>
                         <p className="text-lg font-black text-slate-900 tracking-tight">Open Secure Wire Portal</p>
                      </div>
                   </div>
                   <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-6 w-6 text-blue-400 transition-transform duration-300 ${showWireInstructions ? 'rotate-180' : ''}`} 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                   </svg>
                </div>

                {showWireInstructions && (
                   <div className="p-8 border-t border-blue-100 bg-white space-y-8 animate-in slide-in-from-top-4 duration-500">
                      {/* Security Warning */}
                      <div className="p-6 bg-red-50 border border-red-100 rounded-2xl flex gap-4">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                         </svg>
                         <div>
                            <p className="text-sm font-black text-red-700 uppercase tracking-tight">CRITICAL: Wire Fraud Prevention</p>
                            <p className="text-xs text-red-600 mt-1 leading-relaxed">
                               Criminals target real estate transactions. <strong>Never trust wire instructions sent via email.</strong> These are the ONLY official instructions for your closing. WCT Smart's encrypted portal prevents unauthorized tampering. Always call your Escrow Officer at a known number to verify these details before sending funds.
                            </p>
                         </div>
                      </div>

                      {/* Bank Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-6">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Electronic Transfer Details</h5>
                            <div className="space-y-4">
                               <InstructionRow label="Receiving Bank" value="JPMORGAN CHASE BANK, N.A." />
                               <InstructionRow label="Account Name" value="World Class Title Escrow Account" />
                               <InstructionRow label="Routing Number (ABA)" value="044 000 000" masked />
                               <InstructionRow label="Account Number" value="123456789" masked />
                               <InstructionRow label="Reference Field" value={REAL_PROPERTY_MOCK.parcelId} />
                            </div>
                         </div>
                         <div className="space-y-6">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">How to send your wire</h5>
                            <ol className="space-y-3">
                               <li className="flex gap-3 items-start">
                                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
                                  <p className="text-xs text-slate-600 leading-relaxed">Visit your local bank branch <strong>in person</strong> for the highest level of security.</p>
                               </li>
                               <li className="flex gap-3 items-start">
                                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
                                  <p className="text-xs text-slate-600 leading-relaxed">Provide the transfer details above to your personal banker.</p>
                               </li>
                               <li className="flex gap-3 items-start">
                                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
                                  <p className="text-xs text-slate-600 leading-relaxed">Request a <strong>Federal Reference Number</strong> once the wire is processed.</p>
                               </li>
                               <li className="flex gap-3 items-start">
                                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">4</span>
                                  <p className="text-xs text-slate-600 leading-relaxed">Upload your wire confirmation receipt here to trigger instant reconciliation.</p>
                               </li>
                            </ol>
                         </div>
                      </div>
                   </div>
                )}
             </button>
          </div>
          
          <ExpectationBox 
            title="The Final Financial Audit" 
            estTime="24 Hours" 
            description="Every penny is accounted for. This disclosure is the final result of a multi-party audit between WCT, your lender, and the seller's representatives to ensure 100% precision."
            brand={brand}
          />

          <div className="flex justify-center gap-6 mt-8">
             <Button label="Print Digital CD" onClick={() => window.print()} brand={brand} />
             <Button label="Acknowledge & Sign" onClick={onNext} primary brand={brand} className="shadow-lg shadow-blue-500/20" />
          </div>
        </div>
      );

    case TransactionStep.CLOSED:
      return (
        <div className="animate-in fade-in duration-1000 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center">
            {/* Activation Shield Visual */}
            <div className="relative mb-12">
               <div className="absolute inset-0 bg-blue-100 rounded-full scale-150 blur-3xl opacity-30 animate-pulse"></div>
               <div className="relative z-10 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border border-slate-100 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600 animate-in zoom-in duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="absolute -inset-2 border-2 border-blue-600/20 rounded-full animate-ping [animation-duration:3s]"></div>
               </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <h2 className="font-header text-5xl tracking-tighter text-slate-900 mb-2">
                Ownership Verified.<br/>Protection Activated.
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed px-4">
                Your property records for <span className="text-slate-900 font-bold">{REAL_PROPERTY_MOCK.address}</span> are now professionally monitored and continuously protected by WCT Smart ONE.
              </p>
            </div>

            <div className="mt-16 flex flex-col items-center gap-6">
               <button 
                  onClick={onNext}
                  className="px-16 py-6 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 active:scale-95 transition-all hover:bg-slate-800 hover:shadow-xl"
               >
                  Enter Smart ONE Dashboard
               </button>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                 Authenticated Steward-Level Access
               </p>
            </div>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-slate-100 pt-10">
               <div className="text-left">
                  <p className="text-[9px] font-black uppercase text-blue-600 tracking-widest mb-1">Title Shield</p>
                  <p className="text-xs text-slate-600 font-medium">24/7 public record surveillance for unauthorized lien activity.</p>
               </div>
               <div className="text-left">
                  <p className="text-[9px] font-black uppercase text-blue-600 tracking-widest mb-1">Move-In Coordination</p>
                  <p className="text-xs text-slate-600 font-medium">Curated activation of essential utility and transition services.</p>
               </div>
               <div className="text-left">
                  <p className="text-[9px] font-black uppercase text-blue-600 tracking-widest mb-1">Equity Review</p>
                  <p className="text-xs text-slate-600 font-medium">Ongoing professional audit of your property value and capital position.</p>
               </div>
            </div>
        </div>
      );

    default:
      return null;
  }
};

const InstructionRow = ({ label, value, masked }: { label: string, value: string, masked?: boolean }) => {
  const [isMasked, setIsMasked] = useState(masked);

  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{label}</span>
       <div className="flex items-center gap-2">
          <span className={`text-xs font-mono font-bold ${isMasked ? 'blur-[4px] select-none' : 'text-slate-900'}`}>
             {value}
          </span>
          {masked && (
             <button 
                onClick={(e) => { e.stopPropagation(); setIsMasked(!isMasked); }}
                className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800"
             >
                {isMasked ? 'Reveal' : 'Hide'}
             </button>
          )}
       </div>
    </div>
  );
};
