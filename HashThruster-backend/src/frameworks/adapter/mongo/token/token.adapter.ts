import { TokenQuery } from '../../../../domain/types/token-types';

export function adapterMongoDataToken(
  mongoTokenResponse: any
): TokenQuery {
  return {
    _id: mongoTokenResponse._id.toString(),
    creation_date: mongoTokenResponse.creation_date,
    projectName: mongoTokenResponse.projectName,
    tokenName: mongoTokenResponse.tokenName,
    tokenSymbol: mongoTokenResponse.tokenSymbol,
    projectWebsite: mongoTokenResponse.projectWebsite,
    projectDescription: mongoTokenResponse.projectDescription,
    technologies: mongoTokenResponse.technologies,
    isOpenSource: mongoTokenResponse.isOpenSource,
    repositoryLink: mongoTokenResponse.repositoryLink,
    isAudited: mongoTokenResponse.isAudited,
    tokenPurpose: mongoTokenResponse.tokenPurpose,
    tokenSupply: mongoTokenResponse.tokenSupply,
    tokenDistribution: mongoTokenResponse.tokenDistribution,
    tokenStandard: mongoTokenResponse.tokenStandard,
    hashscanLink: mongoTokenResponse.hashscanLink,
    revenueGeneration: mongoTokenResponse.revenueGeneration,
    tokenUseCases: mongoTokenResponse.tokenUseCases,
    registeredCountry: mongoTokenResponse.registeredCountry,
    compliesWithRegulations: mongoTokenResponse.compliesWithRegulations,
    obtainedLegalAdvice: mongoTokenResponse.obtainedLegalAdvice,
    fundraisingTarget: mongoTokenResponse.fundraisingTarget,
    minInvestment: mongoTokenResponse.minInvestment,
    maxInvestment: mongoTokenResponse.maxInvestment,
    tokenValue: mongoTokenResponse.tokenValue,
    successReason: mongoTokenResponse.successReason,
    differentiation: mongoTokenResponse.differentiation,
    launchDate: mongoTokenResponse.launchDate,
    linkedin: mongoTokenResponse.linkedin,
    discord: mongoTokenResponse.discord,
    telegram: mongoTokenResponse.telegram,
    twitter: mongoTokenResponse.twitter,
    instagram: mongoTokenResponse.instagram,
    pdfFileName: mongoTokenResponse.pdfFileName,
    imageFileName: mongoTokenResponse.imageFileName,
    walletAccountId: mongoTokenResponse.walletAccountId
  };
}