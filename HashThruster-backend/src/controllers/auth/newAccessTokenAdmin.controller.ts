import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { newAccessTokenAdminUseCase } = dependencies;

  const authenticateAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { refreshToken, public_key } = req.body;
      const newAccessToken = newAccessTokenAdminUseCase(dependencies).execute;

      const response = await newAccessToken(refreshToken, public_key);

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

  return { authenticateAdminController };
}
