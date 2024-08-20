export interface CreateAndUpdateTokenQuery {
    projectName: string;
    creation_date?: Date;
    tokenName: string;
    tokenSymbol: string;
    projectWebsite: string;
    projectDescription: string;
    technologies: string[];
    isOpenSource: boolean;
    repositoryLink: string;
    isAudited: boolean;
    tokenPurpose: string;
    tokenSupply: number;
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
    tokenValue: number;
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
    walletAccountId?: {
        accountId: string,
        private_key?: string,
        public_key?: string
    } | string;
}


export interface UseWallet {
    accountId: string,
    private_key: string,
    public_key: string
}