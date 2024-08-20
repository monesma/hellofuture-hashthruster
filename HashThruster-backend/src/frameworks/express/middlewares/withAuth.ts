import { Request, Response, NextFunction } from 'express';
import { verifyAccesToken } from '../../common/createAndVerifyAccessToken';
import ResponseError from '../../common/ResponseError';
import ResponseRequest from '../../common/ResponseRequest';

export const withAuth = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];
  if (!token) {
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
  }

  const decoded = verifyAccesToken(token.toString());
  if (decoded) {
    req.id = decoded.id
    next();
  } else {
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
  }
};
