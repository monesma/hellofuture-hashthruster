export interface ProjectQuery {
    _id: string;
    creation_date: Date;
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
    tokenSupply: number;
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
    tokenValue: number;
    successReason: string;
    differentiation: string;
    launchDate: string;
    hasLaunched: boolean;
    projectLaunchDate: string;
    pdfFileName: string;
    projectEmail: string;
    status: 'pending' | 'approved' | 'rejected' | 'listed';
}

export interface TeamMember {
    name: string;
    position: string;
    linkedin: string;
}