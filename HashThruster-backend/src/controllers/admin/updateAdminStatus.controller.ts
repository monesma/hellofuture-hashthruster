import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { updateAdminStatusUseCase } = dependencies;

  const updateAdminStatusController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        id,
        status
      } = req.body;
      const updateAdmin = await updateAdminStatusUseCase(dependencies).execute;
      const response = await updateAdmin(status,id);
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

  return { updateAdminStatusController };
}
