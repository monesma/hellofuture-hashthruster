import { CreateAndUpdateTokenQuery } from '../../domain/dto/token/token-dto';

export default class Token {
  public projectName: string;
  public creation_date?: Date;
  public tokenName: string;
  public tokenSymbol: string;
  public projectWebsite: string;
  public projectDescription: string;
  public technologies: string[];
  public isOpenSource: boolean;
  public repositoryLink: string;
  public isAudited: boolean;
  public tokenPurpose: string;
  public tokenSupply: number;
  public tokenDistribution: string;
  public tokenStandard: string;
  public hashscanLink: string;
  public revenueGeneration: string;
  public tokenUseCases: string;
  public registeredCountry: string;
  public compliesWithRegulations: boolean;
  public obtainedLegalAdvice: boolean;
  public fundraisingTarget: number;
  public minInvestment: string;
  public maxInvestment: string;
  public tokenValue: number;
  public successReason: string;
  public differentiation: string;
  public launchDate: string;
  public linkedin: string;
  public discord: string;
  public telegram: string;
  public twitter: string;
  public instagram: string;
  public pdfFileName: string;
  public imageFileName: string;

  constructor({
    projectName,
    creation_date,
    tokenName,
    tokenSymbol,
    projectWebsite,
    projectDescription,
    technologies,
    isOpenSource,
    repositoryLink,
    isAudited,
    tokenPurpose,
    tokenSupply,
    tokenDistribution,
    tokenStandard,
    hashscanLink,
    revenueGeneration,
    tokenUseCases,
    registeredCountry,
    compliesWithRegulations,
    obtainedLegalAdvice,
    fundraisingTarget,
    minInvestment,
    maxInvestment,
    tokenValue,
    successReason,
    differentiation,
    launchDate,
    linkedin,
    discord,
    telegram,
    twitter,
    instagram,
    pdfFileName,
    imageFileName
  }: CreateAndUpdateTokenQuery) {
    this.projectName = projectName;
    this.creation_date = creation_date;
    this.tokenName = tokenName;
    this.tokenSymbol = tokenSymbol;
    this.projectWebsite = projectWebsite;
    this.projectDescription = projectDescription;
    this.technologies = technologies;
    this.isOpenSource = isOpenSource;
    this.repositoryLink = repositoryLink;
    this.isAudited = isAudited;
    this.tokenPurpose = tokenPurpose;
    this.tokenSupply = tokenSupply;
    this.tokenDistribution = tokenDistribution;
    this.tokenStandard = tokenStandard;
    this.hashscanLink = hashscanLink;
    this.revenueGeneration = revenueGeneration;
    this.tokenUseCases = tokenUseCases;
    this.registeredCountry = registeredCountry;
    this.compliesWithRegulations = compliesWithRegulations;
    this.obtainedLegalAdvice = obtainedLegalAdvice;
    this.fundraisingTarget = fundraisingTarget;
    this.minInvestment = minInvestment;
    this.maxInvestment = maxInvestment;
    this.tokenValue = tokenValue;
    this.successReason = successReason;
    this.differentiation = differentiation;
    this.launchDate = launchDate;
    this.linkedin = linkedin;
    this.discord = discord;
    this.telegram = telegram;
    this.twitter = twitter;
    this.instagram = instagram;
    this.pdfFileName = pdfFileName;
    this.imageFileName = imageFileName;
  }
}
