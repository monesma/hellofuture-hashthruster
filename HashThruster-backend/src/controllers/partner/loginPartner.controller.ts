import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { loginPartnerUseCase } = dependencies;

  const loginPartnerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        email,
        password
      } = req.body;

      const loginPartner = await loginPartnerUseCase(dependencies).execute;
      const response = await loginPartner({
        email,
        password
      });
      return res.json(response);
    } catch (err) {
      res.json(
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

  return { loginPartnerController };
}
