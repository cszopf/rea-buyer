
import React, { useState } from 'react';
import { TransactionStep, BrandConfig, Document, TitleIssue, ExperienceLevel } from '../types';
import { REAL_PROPERTY_MOCK, PREFERRED_LENDERS } from '../constants';

interface StepProps {
  step: TransactionStep;
  brand: BrandConfig;
  onNext: () => void;
  onBack?: () => void;
  experienceLevel?: ExperienceLevel;
  optInInsurance?: boolean;
  setOptInInsurance?: (val: boolean) => void;
  optInMortgage?: boolean;
  setOptInMortgage?: (val: boolean) => void;
}

const PricingModule: React.FC<{ brand: BrandConfig; experienceLevel: ExperienceLevel }> = ({ brand, experienceLevel }) => {
  const isProtection = experienceLevel === 'standard';
  const isEfficiency = experienceLevel === 'simple';
  const isPremium = experienceLevel === 'complete';

  const getBuyerCopy = () => {
    if (isProtection) return "Your $199 fee ensures your property is verified in real time, your funds are protected against fraud, and every step of your closing is transparent. It also includes a 90-day free trial of Smart One, providing ongoing title monitoring and ownership protection after closing. We believe security should be built in, not added later.";
    if (isEfficiency) return "Your $199 fee powers Smart Spaces, which automates your title search in real time and reduces delays by combining technology with expert review. You’ll also receive a 90-day free trial of Smart One to manage your property after closing. No hidden line items. No unnecessary fees.";
    return "Your $199 fee gives you access to Smart Spaces, our modern title environment that verifies your property in real time while our experts oversee every detail. It also includes a 90-day Smart One trial so your ownership experience continues beyond closing. Transparent pricing designed for a better closing experience.";
  };

  return (
    <div className="my-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mb-8">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Pricing Transparency</h3>
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Our Fees. Simple. Transparent. Built for You.</h2>
      </div>

      <div className="flex justify-start mb-8">
        {/* Buyer Fee Card - Centered or max-width adjusted for single card */}
        <div className="w-full md:max-w-md bg-white border-2 border-slate-100 p-8 rounded-[2.5rem] relative overflow-hidden group hover:border-blue-600 transition-all shadow-sm">
           <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Buyer Fee</p>
           <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-black text-slate-900">$199</span>
              <span className="text-xs font-bold text-slate-400">per buyer</span>
           </div>
           <p className="text-xs text-slate-600 leading-relaxed font-medium mb-6 relative z-10">
              {getBuyerCopy()}
           </p>
           <div className="space-y-2 border-t border-slate-50 pt-4">
              {['Smart Spaces automated title search', 'Real-time transaction dashboard', 'Wire fraud monitoring', 'Digital coordination', '90-day free trial of Smart One'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                   <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                   <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">{item}</span>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-slate-100 pt-8">
         <div>
            <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-900 mb-2">Title Insurance Disclosure</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed italic">
               Title insurance premiums are filed and regulated by state rate manuals and are not marked up or altered by Smart or WCT.
            </p>
         </div>
         <div>
            <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-900 mb-2">Additional Fees Disclosure</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed italic">
               All other line items on the Closing Disclosure are required by the purchase contract, your lender, or government recording fees. We do not add hidden technology or processing charges.
            </p>
         </div>
      </div>
    </div>
  );
};

const ExpectationBox: React.FC<{ title: string; description: string; estTime: string; brand: BrandConfig; experienceLevel?: ExperienceLevel }> = ({ title, description, estTime, brand, experienceLevel = 'standard' }) => {
  if (experienceLevel === 'simple') return null;

  return (
    <div className="mt-12 p-6 bg-slate-50 border-l-4 border-slate-900 rounded-r-2xl shadow-sm animate-in fade-in slide-in-from-left-4 duration-1000">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Radical Transparency: What to expect</h4>
        <span className="text-[10px] font-black uppercase tracking-tighter bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-900 shadow-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Phase Duration: {estTime}
        </span>
      </div>
      <p className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-tight">{title}</p>
      {experienceLevel === 'complete' && (
        <p className="text-xs text-slate-600 leading-relaxed italic">{description}</p>
      )}
    </div>
  );
};

const StepHeader: React.FC<{ title: string; subtitle: string; brand: BrandConfig; stepNum: number }> = ({ title, subtitle, brand, stepNum }) => (
  <div className="mb-10">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-slate-900" style={{ backgroundColor: brand.accentColor }}>Step {stepNum} of 9</span>
      <span className="text-xs font-bold text-slate-500">Transaction Phase</span>
    </div>
    <h2 className="font-header uppercase-tracking-150 text-3xl md:text-4xl mb-3 leading-tight" style={{ color: brand.primaryColor }}>
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
  step, brand, onNext, onBack, experienceLevel = 'standard',
  optInInsurance, setOptInInsurance 
}) => {
  const [showWireInstructions, setShowWireInstructions] = useState(false);
  const [financingPath, setFinancingPath] = useState<'choose' | 'existing' | 'shop' | 'new' | 'cash'>('choose');

  const handleDownloadWireInstructions = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert("Official Wire Instructions PDF is being generated and downloaded to your device.");
    window.print();
  };

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
              <p className="font-bold text-slate-800 text-lg">{financingPath === 'cash' ? 'No Lender (Cash Purchase)' : REAL_PROPERTY_MOCK.lender}</p>
            </div>
          </div>
          <ExpectationBox 
            title="File Setup & Compliance" 
            estTime="Immediate" 
            experienceLevel={experienceLevel}
            description="Our compliance team is currently mapping your purchase contract to local statutory requirements, ensuring every contingency date is tracked and secured."
            brand={brand}
          />
          <NavActions onNext={onNext} onBack={onBack} brand={brand} showBack={false} nextLabel="Confirm Details" />
        </div>
      );

    case TransactionStep.FINANCING:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={2}
            title="Financing Confirmation" 
            subtitle="Confirm your lender details or compare rates with Smart Preferred Lenders." 
            brand={brand} 
          />
          
          {financingPath === 'choose' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <PathCard 
                title="Existing Lender" 
                subtitle="Use the lender on your contract" 
                icon="🏦"
                onClick={() => setFinancingPath('existing')}
              />
              <PathCard 
                title="Shop Rates" 
                subtitle="Compare with Smart Partners" 
                icon="📊"
                onClick={() => setFinancingPath('shop')}
              />
              <PathCard 
                title="New Approval" 
                subtitle="Switch to a new pre-approval" 
                icon="📝"
                onClick={() => setFinancingPath('new')}
              />
              <PathCard 
                title="Cash Purchase" 
                subtitle="Skip financing coordination" 
                icon="💰"
                onClick={() => setFinancingPath('cash')}
              />
            </div>
          )}

          {financingPath === 'cash' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4">
                 <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Cash Transaction Verification</h4>
                 <p className="text-slate-600 text-sm leading-relaxed">
                   You have indicated that this is a <strong>Cash Transaction</strong>. WCT will proceed without lender instructions. Please ensure your proof of funds is available if requested by the seller.
                 </p>
                 <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm shrink-0">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                     </svg>
                   </div>
                   <p className="text-xs text-green-800 font-bold">Lender requirements have been waived for this file.</p>
                 </div>
              </div>
              <div className="flex justify-center">
                 <button onClick={() => setFinancingPath('choose')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">Change to Financing</button>
              </div>
              <NavActions onNext={onNext} onBack={() => setFinancingPath('choose')} brand={brand} nextLabel="Confirm Cash Purchase" />
            </div>
          )}

          {financingPath === 'existing' && (
             <div className="space-y-6 animate-in fade-in duration-500">
                <div className="bg-white border border-slate-200 p-8 rounded-3xl space-y-4">
                   <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-2">Lender Information</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">Lender Name</label>
                        <input type="text" defaultValue={REAL_PROPERTY_MOCK.lender} className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">Loan Officer Email</label>
                        <input type="email" placeholder="lo@lender.com" className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold" />
                      </div>
                   </div>
                   <div className="pt-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase block mb-2">Upload Pre-Approval (Optional)</label>
                      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50/50">
                         <svg className="w-8 h-8 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                         </svg>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Drop PDF or Click to Upload</p>
                      </div>
                   </div>
                </div>
                <div className="flex justify-between items-center bg-blue-50 border border-blue-100 p-4 rounded-2xl">
                   <div className="flex gap-3 items-center">
                      <span className="text-xl">🛡️</span>
                      <p className="text-xs text-blue-800 font-bold">Lender details will be verified by WCT within 24 hours.</p>
                   </div>
                   <button onClick={() => setFinancingPath('choose')} className="text-[10px] font-black text-blue-600 uppercase">Change Path</button>
                </div>
                <NavActions onNext={onNext} onBack={() => setFinancingPath('choose')} brand={brand} nextLabel="Confirm & Continue" />
             </div>
          )}

          {(financingPath === 'shop' || financingPath === 'new') && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PREFERRED_LENDERS.map((l, i) => (
                    <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all cursor-pointer group hover:border-blue-600">
                       <div className="flex justify-between items-start mb-4">
                          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                             {l.logo}
                          </div>
                          <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified Rate</span>
                       </div>
                       <h5 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{l.name}</h5>
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">{l.tagline}</p>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{l.description}</p>
                       <button className="w-full py-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all">Request Quote</button>
                    </div>
                  ))}
               </div>
               <div className="flex justify-center">
                  <button onClick={() => setFinancingPath('choose')} className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">Back to Path Selection</button>
               </div>
               <NavActions onNext={onNext} onBack={() => setFinancingPath('choose')} brand={brand} nextLabel="Continue with Current" />
            </div>
          )}

          <ExpectationBox 
            title="Lending Layer Transparency" 
            estTime="Continuous" 
            experienceLevel={experienceLevel}
            description="We coordinate directly with your lender. Once we receive their closing instructions, Smart automatically maps their requirements to our title exam for absolute precision."
            brand={brand}
          />
          {financingPath === 'choose' && <NavActions onNext={onNext} onBack={onBack} brand={brand} nextLabel="Confirm Path First" showBack={true} />}
        </div>
      );

    case TransactionStep.IDENTITY:
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <StepHeader 
            stepNum={3}
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
            experienceLevel={experienceLevel}
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
            stepNum={4}
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
            </div>
          </div>
          <ExpectationBox 
            title="Digital Custody & Vault" 
            estTime="Continuous" 
            experienceLevel={experienceLevel}
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
            stepNum={5}
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
            experienceLevel={experienceLevel}
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
            stepNum={6}
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
            experienceLevel={experienceLevel}
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
            stepNum={7}
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
            experienceLevel={experienceLevel}
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
                  {financingPath === 'cash' ? (
                    <div>
                      <p className="text-xs text-slate-500">Financing Method</p>
                      <p className="text-xl font-black text-slate-900">CASH TRANSACTION</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="text-xs text-slate-500">Loan Amount</p>
                        <p className="text-xl font-black text-slate-900">${REAL_PROPERTY_MOCK.loanAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Interest Rate</p>
                        <p className="text-xl font-black text-slate-900">{REAL_PROPERTY_MOCK.interestRate}%</p>
                      </div>
                    </>
                  )}
               </div>
            </div>
            <div className="md:col-span-2">
               <p className="text-[10px] font-black uppercase text-slate-400 border-b border-slate-100 pb-1 mb-2 tracking-widest">Projected Payments (Year 1)</p>
               <div className="bg-slate-50 p-6 rounded-2xl flex justify-between items-center border border-slate-200 shadow-inner">
                  {financingPath === 'cash' ? (
                    <div>
                      <p className="text-xs text-slate-600 font-semibold italic">Principal & Interest</p>
                      <p className="text-2xl font-black text-slate-900">$0.00 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-slate-600 font-semibold">Principal & Interest</p>
                      <p className="text-2xl font-black text-slate-900">$5,915.38 <span className="text-xs font-normal text-slate-500">/mo</span></p>
                    </div>
                  )}
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
                      <p className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">${(financingPath === 'cash' ? 14500 : 26755.91).toLocaleString()}</p>
                      <span className="text-[10px] bg-blue-100 text-blue-700 font-black px-2 py-0.5 rounded-full uppercase tracking-tighter mt-1 inline-block">Includes $50 Digital Credit</span>
                   </div>
                   <div className="md:text-right">
                      <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Final Cash to Close</h4>
                      <p className="text-3xl md:text-5xl font-black text-blue-600 tracking-tighter">${(financingPath === 'cash' ? REAL_PROPERTY_MOCK.salePrice + 14500 : 251578.04).toLocaleString()}</p>
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Loan Costs (A+B+C)</p>
                        <p className="text-xs font-bold text-slate-800">${financingPath === 'cash' ? '4,024.00' : '7,426.00'}</p>
                      </div>
                      <div className="space-y-3 px-1">
                         {financingPath !== 'cash' && (
                           <>
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-500">A. Origination Charges (0.25% Points)</span>
                                <span className="font-bold text-slate-800">$2,500.00</span>
                             </div>
                             <div className="flex justify-between text-sm">
                                <span className="text-slate-500">B. Services Did Not Shop For</span>
                                <span className="font-bold text-slate-800">$902.00</span>
                             </div>
                           </>
                         )}
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500">C. Services Did Shop For (WCT Settlement)</span>
                            <span className="font-bold text-slate-800">$4,024.00</span>
                         </div>
                      </div>
                   </div>

                   <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] font-black uppercase text-slate-900 tracking-widest">Other Costs (E+F+G+H)</p>
                        <p className="text-xs font-bold text-slate-800">${financingPath === 'cash' ? '10,526.00' : '19,329.91'}</p>
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
             <div 
                onClick={() => setShowWireInstructions(!showWireInstructions)}
                className="w-full group overflow-hidden rounded-3xl border border-blue-200 bg-blue-50/30 hover:bg-blue-50 transition-all shadow-sm cursor-pointer"
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
                   <div className="flex items-center gap-4">
                      {showWireInstructions && (
                        <button 
                          onClick={handleDownloadWireInstructions}
                          className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download PDF
                        </button>
                      )}
                      <svg 
                         xmlns="http://www.w3.org/2000/svg" 
                         className={`h-6 w-6 text-blue-400 transition-transform duration-300 ${showWireInstructions ? 'rotate-180' : ''}`} 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                   </div>
                </div>

                {showWireInstructions && (
                   <div className="p-8 border-t border-blue-100 bg-white space-y-8 animate-in slide-in-from-top-4 duration-500 text-left">
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
                            <button 
                               onClick={handleDownloadWireInstructions}
                               className="sm:hidden w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95"
                            >
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                               </svg>
                               Download PDF Instructions
                            </button>
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
             </div>
          </div>
          
          {/* Transparent Pricing Module Injection */}
          <PricingModule brand={brand} experienceLevel={experienceLevel} />

          <ExpectationBox 
            title="The Final Financial Audit" 
            estTime="24 Hours" 
            experienceLevel={experienceLevel}
            description="Every penny is accounted for. This disclosure is the final result of a multi-party audit between WCT, your lender, and the seller's representatives to ensure 100% precision."
            brand={brand}
          />

          <div className="flex flex-wrap justify-center gap-4 mt-8">
             <Button label="Print Digital CD" onClick={() => window.print()} brand={brand} />
             <Button label="Acknowledge & Sign" onClick={onNext} primary brand={brand} className="shadow-lg shadow-blue-500/20" />
          </div>
        </div>
      );

    case TransactionStep.CLOSED:
      return (
        <div className="animate-in fade-in duration-1000 max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
            <div className="relative mb-12">
               <div className="absolute inset-0 bg-blue-100 rounded-full scale-150 blur-3xl opacity-30 animate-pulse"></div>
               <div className="relative z-10 w-24 md:w-32 h-24 md:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border border-slate-100 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-blue-600 animate-in zoom-in duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="absolute -inset-2 border-2 border-blue-600/20 rounded-full animate-ping [animation-duration:3s]"></div>
               </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              <h2 className="font-header text-3xl md:text-5xl tracking-tighter text-slate-900 mb-2 leading-tight">
                Ownership Verified.<br/>Protection Activated.
              </h2>
              <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed px-4">
                Your property records for <span className="text-slate-900 font-bold">{REAL_PROPERTY_MOCK.address}</span> are now professionally monitored and continuously protected by WCT Smart ONE.
              </p>
            </div>

            <div className="mt-16 flex flex-col items-center gap-6">
               <button 
                  onClick={onNext}
                  className="px-10 md:px-16 py-5 md:py-6 bg-slate-900 text-white rounded-2xl font-black text-xs md:text-sm uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 active:scale-95 transition-all hover:bg-slate-800 hover:shadow-xl"
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

const PathCard = ({ title, subtitle, icon, onClick }: { title: string, subtitle: string, icon: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-white border border-slate-100 p-6 rounded-3xl text-left hover:border-slate-900 hover:shadow-2xl transition-all active:scale-[0.98] group"
  >
    <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all">{icon}</div>
    <p className="text-base font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors tracking-tight uppercase">{title}</p>
    <p className="text-xs text-slate-500 font-medium leading-snug">{subtitle}</p>
  </button>
);

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
