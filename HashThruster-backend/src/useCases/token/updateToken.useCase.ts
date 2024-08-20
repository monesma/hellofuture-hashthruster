import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import { CreateAndUpdateTokenQuery } from '../../domain/dto/token/token-dto';

export default (dependencies: any) => {
  const { tokenRepository } = dependencies;
  if (!tokenRepository) {
    throw new Error('the project repository should be exist in dependencies');
  }

  const execute = async (
    token: CreateAndUpdateTokenQuery,
    id: string
  ): Promise<ResponseRequest> => {
    const completeToken: CreateAndUpdateTokenQuery = {
      ...token
    };

    const updatedToken = await tokenRepository.updateTokenQuery(completeToken, id);

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
