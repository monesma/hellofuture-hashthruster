import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { updateTokenUseCase } = dependencies;

  const updateTokenController = async (
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
      } = req.body;

      const updateToken = updateTokenUseCase(dependencies).execute;
      const response = await updateToken({
        projectName,
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
        imageFileName,
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

  return { updateTokenController };
}
