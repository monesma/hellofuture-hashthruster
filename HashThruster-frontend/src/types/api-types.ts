interface TeamMember {
  name: string;
  position: string;
  linkedin: string;
}

export interface SubmitData {
  projectName: string;
  tokenName: string;
  tokenSymbol: string;
  projectWebsite: string;
  projectDescription: string;
  teamMemberCount: number;
  teamMembers: TeamMember[];
  hasPartners: boolean;
  partnerCount: number;
  mainPartner: string;
  partnerRole: string;
  technologies: string[];
  isOpenSource: boolean;
  repositoryLink: string;
  isAudited: boolean;
  auditCompany: string;
  tokenPurpose: string;
  tokenSupply: string;
  tokenDistribution: string;
  tokenStandard: string;
  hashscanLink: string;
  businessModel: boolean;
  revenueGeneration: string;
  tokenUseCases: string;
  hasRoadMap: boolean;
  roadMapLink: string;
  registeredCountry: string;
  compliesWithRegulations: boolean;
  obtainedLegalAdvice: boolean;
  marketingStrategy: string;
  communicationChannels: string[];
  communityMembers: string;
  risks: string;
  challenges: string;
  fundraisingTarget: number;
  minInvestment: string;
  maxInvestment: string;
  tokenValue: string;
  successReason: string;
  differentiation: string;
  launchDate: string;
  hasLaunched: boolean;
  projectLaunchDate: string;
  pdfFileName: string;
  projectEmail: string;
}


export interface TokenData {
  _id: string;
  projectName: string;
  tokenName: string;
  tokenSymbol: string;
  projectWebsite: string;
  projectDescription: string;
  technologies: string[];
  isOpenSource: boolean;
  repositoryLink: string;
  isAudited: boolean;
  tokenPurpose: string;
  tokenSupply: string;
  tokenDistribution: string;
  tokenStandard: string;
  hashscanLink: string;
  revenueGeneration: string;
  tokenUseCases: string;
  registeredCountry: string;
  compliesWithRegulations: boolean;
  obtainedLegalAdvice: boolean;
  fundraisingTarget: number;
  minInvestment: string;
  maxInvestment: string;
  tokenValue: string;
  successReason: string;
  differentiation: string;
  launchDate: string;
  linkedin: string;
  discord: string;
  telegram: string;
  twitter: string;
  instagram: string;
  pdfFileName: string;
  imageFileName: string;
  walletAccountId: {
    accountId: string;
  } | string;
  refreshToken: string | null;
  public_key: string;
  id: string;
  email: string;
  accessToken: string | null;
  role: 'admin' | 'superAdmin'
}

export interface TokenDataHash {
  token_id: string;
  type: string;
  decimals: number | string;
  supply_type: string;
  initial_supply: number | string;
  total_supply: number | string;
  max_supply: number | string;
  created_timestamp: number | string;
  symbol: string;
}