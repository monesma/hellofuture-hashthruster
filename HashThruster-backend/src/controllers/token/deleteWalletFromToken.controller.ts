import ResponseError from '../../frameworks/common/ResponseError';
import ResponseRequest from '../../frameworks/common/ResponseRequest';
import { Request, Response, NextFunction } from 'express';

export default function (dependencies: any) {
  const { deleteWalletFromTokenUseCase } = dependencies;

  const deleteWalletFromTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {

      const deleteWallet = deleteWalletFromTokenUseCase(dependencies).execute;
      const response = await deleteWallet( req.params.id);
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

  return { deleteWalletFromTokenController };
}
