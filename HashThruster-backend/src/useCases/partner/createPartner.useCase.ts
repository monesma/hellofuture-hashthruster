import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import {
  CreatePartnerQuery,
  CreateFrontPartnerQuery,
} from '../../domain/dto/partner/partner-dto';
import { createPublicPrivateKeys } from '../../frameworks/common/createPublicPrivateKeys';

export default (dependencies: any) => {
  const { partnerRepository } = dependencies;
  if (!partnerRepository) {
    throw new Error('the partner repository should be exist in dependencies');
  }

  const execute = async (
    partner: CreateFrontPartnerQuery,
  ): Promise<ResponseRequest> => {
    const isEmailExist = await partnerRepository.getByEmail(partner.email);
    const isNameExist = await partnerRepository.getByCompanyName(partner.name);

    if (isEmailExist || isNameExist) {
      return new ResponseRequest({
        status: 400,
        error: new ResponseError({
          error: 'Bad Email or Company Name',
          msg: 'Email or Campany Name already exist in database',
        }),
        content: null,
      });
    }

    const { public_key, private_key } = createPublicPrivateKeys();

    const completePartner: CreatePartnerQuery = {
      ...partner,
      creation_date: new Date(),
      public_key,
      private_key,
      password: null ,
      status: 'pending',
    };

    if (
      completePartner.hasOwnProperty('public_key') &&
      completePartner.hasOwnProperty('private_key')
    ) {
      const createdPartner = await partnerRepository.add(completePartner);

      if (createdPartner._id) {
        return new ResponseRequest({
          status: 200,
          error: null,
          content: {
            createdPartner,
          },
        });
      }
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
