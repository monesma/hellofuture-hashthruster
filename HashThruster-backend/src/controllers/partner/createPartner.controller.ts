import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { createPartnerUseCase } = dependencies;

  const createPartnerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        name,
        creation_date,
        first_name,
        last_name,
        email,
        phone,
        status,
      } = req.body;

      const createPartner = await createPartnerUseCase(dependencies).execute;
      const response = await createPartner({
        name,
        creation_date,
        first_name,
        last_name,
        email,
        phone,
        status,
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

  return { createPartnerController };
}
