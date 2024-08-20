import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { adminRepository } = dependencies;

  if (!adminRepository) {
    throw new Error('The admin repository should exist in dependencies');
  }

  const execute = async (admin: any): Promise<ResponseRequest> => {
    try {
      const isEmailExist = await adminRepository.getById(admin.id);

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
    
      const adminInfos = {
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
            admin: adminInfos
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
