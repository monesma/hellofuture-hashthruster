import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { tokenRepository } = dependencies;
  if (!tokenRepository) {
    throw new Error('the project repository should be exist in dependencies');
  }

  const execute = async (
    id: string
  ): Promise<ResponseRequest> => {

    const updatedToken = await tokenRepository.deleteWallet(id);

    if (updatedToken._id) {
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
            updatedToken,
        },
      });
    }
    return new ResponseRequest({
      status: 500,
      error: new ResponseError({
        error: 'internal error',
        msg: 'a problem occured',
      }),
      content: null,
    });
  };

  return { execute };
};
