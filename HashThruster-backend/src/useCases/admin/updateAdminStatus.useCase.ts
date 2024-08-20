import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { adminRepository } = dependencies;

  if (!adminRepository) {
    throw new Error('The admin repository should exist in dependencies');
  }

  const execute = async (newStatus: string, id: string): Promise<ResponseRequest> => {
    try {
    
      const isUserExist = await adminRepository.getById(id);

      if (!isUserExist) {
        return new ResponseRequest({
          status: 404,
          error: new ResponseError({
            error: 'Not found',
            msg: 'This account does not exist',
          }),
          content: null,
        });
      }

      const update = await adminRepository.updateAdminStatusQuery(newStatus, id);
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          msg: "Admin updated successfully",
          admin: update
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
