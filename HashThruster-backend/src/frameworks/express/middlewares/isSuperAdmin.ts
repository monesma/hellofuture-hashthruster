import { Request, Response, NextFunction } from 'express';
import ResponseError from '../../common/ResponseError';
import ResponseRequest from '../../common/ResponseRequest';

export const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {
  const {role} = req.body
  if (role !== "superAdmin") {
    return res.json(
      new ResponseRequest({
        status: 401,
        error: new ResponseError({
          error: 'Unauthorized',
          msg: 'Acces forbidden',
        }),
        content: null,
      }),
    );
  } else {
    next()
  }
}