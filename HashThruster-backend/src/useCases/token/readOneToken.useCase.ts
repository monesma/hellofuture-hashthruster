import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { tokenRepository } = dependencies;

  if (!tokenRepository) {
    throw new Error('the token repository should exist in dependencies');
  }

  const execute = async (id: string): Promise<ResponseRequest> => {
    try {
      const token = await tokenRepository.getById(id);
      if (token !== null) {
        const { walletAccountId, ...rest } = token._doc || token;
        let filteredToken;
        if (walletAccountId !== 'deleted') {
          // Ensure walletAccountId exists and has an accountId
          const filteredWalletAccountId =
            walletAccountId && walletAccountId.accountId
              ? { accountId: walletAccountId.accountId }
              : null;

          filteredToken = {
            ...rest,
            walletAccountId: filteredWalletAccountId,
          };
        } else {
          filteredToken = token;
        }
        return new ResponseRequest({
          status: 200,
          error: null,
          content: {
            token: filteredToken,
          },
        });
      } else {
        return new ResponseRequest({
          status: 404,
          error: new ResponseError({
            error: 'Not found',
            msg: 'Data not found',
          }),
          content: null,
        });
      }
    } catch (err) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: 'internal error',
          msg: 'a problem occurred',
        }),
        content: null,
      });
    }
  };

  return { execute };
};
