import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

import { createAccessToken } from '../../frameworks/common/createAndVerifyAccessToken';

export default (dependencies: any) => {
  const { adminRepository } = dependencies;

  if (!adminRepository) {
    throw new Error('the dataset repository should be exist in dependencies');
  }

  const execute = async (
    refreshToken: string,
    public_key: string,
  ): Promise<ResponseRequest> => {
    if (refreshToken) {
      const accessToken = createAccessToken(refreshToken, public_key);

      if (accessToken) {
        return new ResponseRequest({
          status: 200,
          error: null,
          content: {
            accessToken,
          },
        });
      }

      return new ResponseRequest({
        status: 401,
        error: new ResponseError({
          error: 'Unauthorized',
          msg: 'Acces forbidden',
        }),
        content: null,
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
