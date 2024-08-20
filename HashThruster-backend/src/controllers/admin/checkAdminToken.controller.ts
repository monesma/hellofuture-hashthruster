import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { checkAdminTokenUseCase } = dependencies;
  const checkAdminTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const checkAdmin = await checkAdminTokenUseCase(dependencies).execute;
      const response = await checkAdmin(req);
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

  return { checkAdminTokenController };
}
