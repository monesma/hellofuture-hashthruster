import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { updatePartnerPasswordUseCase } = dependencies;

  const updatePartnerPasswordController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        id,
        password
      } = req.body;

      const updatePartner = await updatePartnerPasswordUseCase(dependencies).execute;
      const response = await updatePartner({
        id,
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

  return { updatePartnerPasswordController };
}
