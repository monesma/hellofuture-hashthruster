import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { updateProjectUseCase } = dependencies;

  const updateProjectController = async (
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
        projectEmail
      } = req.body;

      const updateProject = updateProjectUseCase(dependencies).execute;
      const response = await updateProject({
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
        projectEmail
      }, req.params.id);

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

  return { updateProjectController };
}
