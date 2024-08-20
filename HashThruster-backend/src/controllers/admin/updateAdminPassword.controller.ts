import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { updateAdminUseCase } = dependencies;

  const updateAdminPasswordController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        id,
        password
      } = req.body;
      const updateAdmin = await updateAdminUseCase(dependencies).execute;
      const response = await updateAdmin(password,id);
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

  return { updateAdminPasswordController };
}
