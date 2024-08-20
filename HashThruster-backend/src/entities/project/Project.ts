// entities/project/Project.ts

import { CreateProjectQuery, TeamMember } from '../../domain/dto/project/project-dto';

export default class Project {
  public projectName: string;
  public creation_date?: Date;
  public tokenName: string;
  public tokenSymbol: string;
  public projectWebsite: string;
  public projectDescription: string;
  public teamMemberCount: number;
  public teamMembers: TeamMember[];
  public hasPartners: boolean;
  public partnerCount: number;
  public mainPartner: string;
  public partnerRole: string;
  public technologies: string[];
  public isOpenSource: boolean;
  public repositoryLink: string;
  public isAudited: boolean;
  public auditCompany: string;
  public tokenPurpose: string;
  public tokenSupply: number;
  public tokenDistribution: string;
  public tokenStandard: string;
  public hashscanLink: string;
  public businessModel: boolean;
  public revenueGeneration: string;
  public tokenUseCases: string;
  public hasRoadMap: boolean;
  public roadMapLink: string;
  public registeredCountry: string;
  public compliesWithRegulations: boolean;
  public obtainedLegalAdvice: boolean;
  public marketingStrategy: string;
  public communicationChannels: string[];
  public communityMembers: string;
  public risks: string;
  public challenges: string;
  public fundraisingTarget: number;
  public minInvestment: string;
  public maxInvestment: string;
  public tokenValue: number;
  public successReason: string;
  public differentiation: string;
  public launchDate: string;
  public hasLaunched: boolean;
  public projectLaunchDate: string;
  public pdfFileName: string;
  public projectEmail: string;

  constructor({
    projectName,
    creation_date,
    tokenName,
    tokenSymbol,
    projectWebsite,
    projectDescription,
    teamMemberCount,
    teamMembers,
    hasPartners,
    partnerCount,
    mainPartner,
    partnerRole,
    technologies,
    isOpenSource,
    repositoryLink,
    isAudited,
    auditCompany,
    tokenPurpose,
    tokenSupply,
    tokenDistribution,
    tokenStandard,
    hashscanLink,
    businessModel,
    revenueGeneration,
    tokenUseCases,
    hasRoadMap,
    roadMapLink,
    registeredCountry,
    compliesWithRegulations,
    obtainedLegalAdvice,
    marketingStrategy,
    communicationChannels,
    communityMembers,
    risks,
    challenges,
    fundraisingTarget,
    minInvestment,
    maxInvestment,
    tokenValue,
    successReason,
    differentiation,
    launchDate,
    hasLaunched,
    projectLaunchDate,
    pdfFileName,
    projectEmail
  }: CreateProjectQuery) {
    this.projectName = projectName;
    this.creation_date = creation_date;
    this.tokenName = tokenName;
    this.tokenSymbol = tokenSymbol;
    this.projectWebsite = projectWebsite;
    this.projectDescription = projectDescription;
    this.teamMemberCount = teamMemberCount;
    this.teamMembers = teamMembers;
    this.hasPartners = hasPartners;
    this.partnerCount = partnerCount;
    this.mainPartner = mainPartner;
    this.partnerRole = partnerRole;
    this.technologies = technologies;
    this.isOpenSource = isOpenSource;
    this.repositoryLink = repositoryLink;
    this.isAudited = isAudited;
    this.auditCompany = auditCompany;
    this.tokenPurpose = tokenPurpose;
    this.tokenSupply = tokenSupply;
    this.tokenDistribution = tokenDistribution;
    this.tokenStandard = tokenStandard;
    this.hashscanLink = hashscanLink;
    this.businessModel = businessModel;
    this.revenueGeneration = revenueGeneration;
    this.tokenUseCases = tokenUseCases;
    this.hasRoadMap = hasRoadMap;
    this.roadMapLink = roadMapLink;
    this.registeredCountry = registeredCountry;
    this.compliesWithRegulations = compliesWithRegulations;
    this.obtainedLegalAdvice = obtainedLegalAdvice;
    this.marketingStrategy = marketingStrategy;
    this.communicationChannels = communicationChannels;
    this.communityMembers = communityMembers;
    this.risks = risks;
    this.challenges = challenges;
    this.fundraisingTarget = fundraisingTarget;
    this.minInvestment = minInvestment;
    this.maxInvestment = maxInvestment;
    this.tokenValue = tokenValue;
    this.successReason = successReason;
    this.differentiation = differentiation;
    this.launchDate = launchDate;
    this.hasLaunched = hasLaunched;
    this.projectLaunchDate = projectLaunchDate;
    this.pdfFileName = pdfFileName;
    this.projectEmail = projectEmail
  }
}
