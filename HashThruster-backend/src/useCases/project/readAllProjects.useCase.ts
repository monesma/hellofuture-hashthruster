import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { projectRepository } = dependencies;

  if (!projectRepository) {
    throw new Error('the project repository should be exist in dependencies');
  }

  const execute = async (): Promise<ResponseRequest> => {
    try {
      const projects = await projectRepository.getAll();
      if (projects !== null) {
        return new ResponseRequest({
          status: 200,
          error: null,
          content: {
            projects,
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
          msg: 'a problem occured',
        }),
        content: null,
      });
    }
  };

  return { execute };
};
