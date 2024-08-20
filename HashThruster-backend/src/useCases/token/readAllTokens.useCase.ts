import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { tokenRepository } = dependencies;

  if (!tokenRepository) {
    throw new Error('the token repository should exist in dependencies');
  }

  const execute = async (): Promise<ResponseRequest> => {
    try {
      const tokens = await tokenRepository.getAll();
      if (tokens !== null && tokens.length > 0) {
        const filteredTokens = tokens.map((token: any) => {
          const { walletAccountId, ...rest } = token._doc || token;
          if(walletAccountId !== "deleted"){
            // Ensure walletAccountId exists and has an accountId
            const filteredWalletAccountId = walletAccountId && walletAccountId.accountId
              ? { accountId: walletAccountId.accountId }
              : null;

            return {
              ...rest,
              walletAccountId: filteredWalletAccountId,
            };
          } else {
            return token
          }
        });

        return new ResponseRequest({
          status: 200,
          error: null,
          content: {
            tokens: filteredTokens,
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
