import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { createProjectUseCase } = dependencies;

  const createProjectController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        projectName,
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
      } = req.body;

      const createProject = createProjectUseCase(dependencies).execute;
      const response = await createProject({
        projectName,
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
      });

      if (response.status === 200) {
        return res.status(200).json(response);
      } else {
        return res.status(response.status).json(response);
      }
    } catch (err) {
      return res.status(500).json(
        new ResponseRequest({
          status: 500,
          content: null,
          error: new ResponseError({
            error: err,
            msg: 'Request error',
          }),
        }),
      );
    }
  };

  return { createProjectController };
}
