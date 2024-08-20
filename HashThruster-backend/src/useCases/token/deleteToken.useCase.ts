import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { tokenRepository } = dependencies;
  if (!tokenRepository) {
    throw new Error('the token repository should be exist in dependencies');
  }

  const execute = async (
    _id: string,
  ): Promise<ResponseRequest> => {

    const deletedToken = await tokenRepository.delete(_id);

    if (deletedToken === _id) {
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
            msg: "Token deleted with success"
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
