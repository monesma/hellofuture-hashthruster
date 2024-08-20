import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { loginAdminUseCase } = dependencies;

  const loginAdminController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        email,
        password
      } = req.body;

      const loginAdmin = await loginAdminUseCase(dependencies).execute;
      const response = await loginAdmin({
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

  return { loginAdminController };
}
