export interface SubmitData {
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
    refreshToken: string | null;
    public_key: string;
    id: string;
    email: string;
    accessToken: string | null;
    role: 'admin' | 'superAdmin'
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
    walletAccountId: string;
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

  export interface WalletInfo {
    _id: string;
    tokenName: string;
    tokenSymbol: string;
    walletAccountId: {
      accountId: string;
      private_key: string;
      public_key: string;
    }
  }

  export interface WalletAccountId {
    accountId: string;
    private_key: string;
    public_key: string;
  }