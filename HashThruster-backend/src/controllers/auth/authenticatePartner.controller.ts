import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { authenticatePartnerUseCase } = dependencies;

  const authenticatePartnerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { public_key, _id, email } = req.body;

      const authenticatePartner =
        authenticatePartnerUseCase(dependencies).execute;

      const response = await authenticatePartner(
        public_key,
        _id,
        email,
      );

      res.json(response);
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

  return { authenticatePartnerController };
}
