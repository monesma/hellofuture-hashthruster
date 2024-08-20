import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { updateProjectStatusUseCase } = dependencies;

  const updateProjectStatusController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const updateProject = updateProjectStatusUseCase(dependencies).execute;
      const response = await updateProject(req.body.status, req.params.id);

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

  return { updateProjectStatusController };
}
