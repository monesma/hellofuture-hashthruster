import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { adminRepository } = dependencies;

  if (!adminRepository) {
    throw new Error('the admin repository should exist in dependencies');
  }

  const execute = async (): Promise<ResponseRequest> => {
    try {
      const admins = await adminRepository.getAll();
      if (admins !== null && admins.length > 0) {
        return new ResponseRequest({
          status: 200,
          error: null,
          content: {
            admins
          },
        });
      } else {
        return new ResponseRequest({
          status: 404,
          error: new ResponseError({
            error: 'Not found',
            msg: 'Data not found',
          }),
          content: null,
        });
      }
    } catch (err) {
      return new ResponseRequest({
        status: 500,
        error: new ResponseError({
          error: 'internal error',
          msg: 'a problem occurred',
        }),
        content: null,
      });
    }
  };

  return { execute };
};
