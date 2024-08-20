import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Response, NextFunction } from 'express';

export default function () {

  const checkAdminRefreshTokenController = async (
    req: any,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const infos = {
        refreshToken: req.refreshToken,
        accessToken: req.accessToken
      }
      return res.json({status: 200, ...infos});
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

  return { checkAdminRefreshTokenController };
}
