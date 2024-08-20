import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import {
  createRefreshJWT
} from '../../frameworks/common/createAndVerifyRefreshToken';
import { createAccessToken } from '../../frameworks/common/createAndVerifyAccessToken';

export default (dependencies: any) => {
  const { partnerRepository } = dependencies;

  if (!partnerRepository) {
    throw new Error('the dataset repository should be exist in dependencies');
  }

  const execute = async (
    public_key: string,
    _id: string,
    email: string,
  ): Promise<ResponseRequest> => {
    const existedPartner = await partnerRepository.getById(_id);
    if(existedPartner.status !== "validated") {
      return new ResponseRequest({
        status: 401,
        error: new ResponseError({
          error: 'Unauthorized',
          msg: 'Acces forbidden',
        }),
        content: null,
      });
    }

    if (public_key && existedPartner.private_key) {
      const refreshToken = createRefreshJWT({ _id, email }, existedPartner.private_key);
      if (refreshToken) {
        const accessToken = createAccessToken(refreshToken, public_key);

        if (accessToken) {
          return new ResponseRequest({
            status: 200,
            error: null,
            content: {
              refreshToken,
              accessToken,
            },
          });
        }
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
