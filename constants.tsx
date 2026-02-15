
import { BrandConfig, AgentInfo } from './types';

// Add missing LOGO_URL export for the app's brand identity
export const LOGO_URL = 'https://worldclasstitle.com/wp-content/uploads/2022/07/WCT-Logo-Full-Color.png';

export const WCT_BRAND: BrandConfig = {
  logoName: 'WORLD CLASS TITLE',
  primaryColor: '#004EA8',
  accentColor: '#64CCC9',
  lightBlue: '#B9D9EB',
  grayBlue: '#A2B2C8',
  headerFont: 'Nunito Sans',
  bodyFont: 'Nunito Sans',
  contactEmail: 'closings@worldclasstitle.com',
  legalName: 'World Class Title, LLC'
};

export const PARTNER_BRAND: BrandConfig = {
  logoName: 'PREMIER SETTLEMENT',
  primaryColor: '#2D3748',
  accentColor: '#F56565',
  lightBlue: '#E2E8F0',
  grayBlue: '#A0AEC0',
  headerFont: 'Nunito Sans',
  bodyFont: 'Nunito Sans',
  contactEmail: 'help@premiertitle.com',
  legalName: 'Premier Settlement Services'
};

export const MOCK_AGENT: AgentInfo = {
  name: 'Candace Neff',
  brokerage: 'REAL of Ohio',
  phone: '(614) 555-0123',
  email: 'candace@realohio.com',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxI1-JUWXGyUjVXatfUHhiHshsFz3c3rF3IQ&s' 
};

export const REAL_PROPERTY_MOCK = {
  address: "5175 WOODBRIDGE AVENUE",
  cityStateZip: "POWELL, OH 43065",
  parcelId: "2510-078-Woodb",
  salePrice: 1260000,
  loanAmount: 1000000,
  interestRate: 5.875,
  buyerName: "DOUGLAS & CARA O'CONNOR",
  sellerName: "PATRICK T. O'LAUGHLIN, TRUSTEE",
  lender: "LOWER, LLC",
  closingDate: "11/18/2025"
};

export const PREFERRED_LENDERS = [
  {
    name: 'LOWER, LLC',
    tagline: 'Fast Digital Closing',
    description: 'Specializing in high-velocity tech-enabled closings. Preferred WCT partner.',
    logo: 'L'
  },
  {
    name: 'CHASE HOME LENDING',
    tagline: 'Institutional Stability',
    description: 'Local Powell underwriting with national resource support.',
    logo: 'C'
  },
  {
    name: 'ROCKET MORTGAGE',
    tagline: 'Streamlined Approval',
    description: 'Verified digital income and asset verification for rapid pre-approval.',
    logo: 'R'
  }
];
