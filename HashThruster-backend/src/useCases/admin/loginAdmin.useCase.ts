import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import { LoginAdminQuery } from '../../domain/dto/admin/admin-dto';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

export default (dependencies: any) => {
  const { adminRepository } = dependencies;

  if (!adminRepository) {
    throw new Error('The admin repository should exist in dependencies');
  }

  const execute = async (admin: LoginAdminQuery): Promise<ResponseRequest> => {
    try {
      const isEmailExist = await adminRepository.getByEmail(admin.email);

      if (!isEmailExist) {
        return new ResponseRequest({
          status: 404,
          error: new ResponseError({
            error: 'Not found',
            msg: 'This account does not exist',
          }),
          content: null,
        });
      }
      const isPasswordValid = await bcrypt.compare(admin.password, isEmailExist.password);

      if (!isPasswordValid) {
        return new ResponseRequest({
          status: 404,
          error: new ResponseError({
            error: 'Not found',
            msg: 'This account does not exist',
          }),
          content: null,
        });
      }

      const payload = { id: isEmailExist._id };
      
      const token = jwt.sign(payload, JWT_SECRET);

      const user = {
        id: isEmailExist._id,
        email: isEmailExist.email,
        public_key: isEmailExist.public_key,
        first_name: isEmailExist.first_name,
        last_name: isEmailExist.last_name,
        role: isEmailExist.role,
        status: isEmailExist.status,
      };

      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          user,
          token,
        },
      });
    } catch (error) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: 'Internal error',
          msg: 'A problem occurred',
        }),
        content: null,
      });
    }
  };

  return { execute };
};
