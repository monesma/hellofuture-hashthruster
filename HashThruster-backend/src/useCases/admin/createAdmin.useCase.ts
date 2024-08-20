import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import {
  CreateAdminQuery,
  CreateFrontAdminQuery,
} from '../../domain/dto/admin/admin-dto';
import { createPublicPrivateKeys } from '../../frameworks/common/createPublicPrivateKeys';
import generator from 'generate-password';
import bcrypt from 'bcryptjs';

export default (dependencies: any) => {
  const { adminRepository } = dependencies;
  if (!adminRepository) {
    throw new Error('the admin repository should be exist in dependencies');
  }
  const SALT_ROUNDS = parseInt(process.env.SALTROUNDS || '10', 10);
  if (isNaN(SALT_ROUNDS)) {
    throw new Error('SALTROUNDS is not defined or is not a valid number');
  }
  const execute = async (
    admin: CreateFrontAdminQuery,
  ): Promise<ResponseRequest> => {
    const isEmailExist = await adminRepository.getByEmail(admin.sendEmail);
    
    if (isEmailExist) {
      return new ResponseRequest({
        status: 400,
        error: new ResponseError({
          error: 'Bad Email',
          msg: 'Email already exist in database',
        }),
        content: null,
      });
    }

    const { public_key, private_key } = createPublicPrivateKeys();
    let password = generator.generate({
      length: 10,
      numbers: true
    });
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const completeAdmin: CreateAdminQuery = {
      ...admin,
      role: admin.role,
      email: admin.sendEmail,
      creation_date: new Date(),
      public_key,
      private_key,
      password: hashedPassword,
      status: 'pending',
    };
    if (
        completeAdmin.hasOwnProperty('public_key') &&
        completeAdmin.hasOwnProperty('private_key')
    ) {
      const createdAdmin = await adminRepository.add(completeAdmin);
      if (createdAdmin._id) {
        return new ResponseRequest({
          status: 200,
          error: null,
          content: {
            createdAdmin,
            temporaryPassword: password
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
