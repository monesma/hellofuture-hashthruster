import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';

export default (dependencies: any) => {
  const { projectRepository } = dependencies;
  if (!projectRepository) {
    throw new Error('the project repository should be exist in dependencies');
  }

  const execute = async (
    _id: string,
  ): Promise<ResponseRequest> => {

    const deletedProject = await projectRepository.delete(_id);
    if (deletedProject === _id) {
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
            msg: "Project deleted with success"
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
