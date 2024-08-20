import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import { CreateProjectQuery } from '../../domain/dto/project/project-dto';

export default (dependencies: any) => {
  const { projectRepository } = dependencies;
  if (!projectRepository) {
    throw new Error('the project repository should be exist in dependencies');
  }

  const execute = async (
    project: CreateProjectQuery,
  ): Promise<ResponseRequest> => {
    const completeProject: CreateProjectQuery = {
      ...project,
      creation_date: new Date(),
      status: "pending"
    };

    const createdProject = await projectRepository.add(completeProject);

    if (createdProject._id) {
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          createdProject,
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
