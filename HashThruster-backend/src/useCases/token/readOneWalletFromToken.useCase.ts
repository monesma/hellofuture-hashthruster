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
      const { _id, tokenName, tokenSymbol, walletAccountId } = token;
      if (token !== null) {
        return new ResponseRequest({
          status: 200,
          error: null,
          content: {
            walletInfo: {
                _id,
                tokenName,
                tokenSymbol,
                walletAccountId: walletAccountId ? {
                  accountId: walletAccountId.accountId,
                  private_key: walletAccountId.private_key,
                  public_key: walletAccountId.public_key
                } : null
            }
          }
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
