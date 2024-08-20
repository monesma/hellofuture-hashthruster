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
  ): Promise<ResponseRequest> => {
    const completeToken: CreateAndUpdateTokenQuery = {
      ...token,
      creation_date: new Date()
    };

    const createdToken = await tokenRepository.add(completeToken);

    if (createdToken._id) {
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
            createdToken,
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
