import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { createTokenUseCase } = dependencies;

  const createTokenController = async (
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
        imageFileName,
        walletAccountId
      } = req.body;

      const createToken = createTokenUseCase(dependencies).execute;
      const response = await createToken({
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
        walletAccountId
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

  return { createTokenController };
}
