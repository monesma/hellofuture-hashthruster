import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import { UpdateProjectQuery } from '../../domain/dto/project/project-dto';

export default (dependencies: any) => {
  const { projectRepository } = dependencies;
  if (!projectRepository) {
    throw new Error('the token repository should be exist in dependencies');
  }

  const execute = async (
    project: UpdateProjectQuery,
    id: string
  ): Promise<ResponseRequest> => {
    const completeProject: UpdateProjectQuery = {
      ...project,
    };
    
    const updatedProject = await projectRepository.updateProjectQuery(completeProject, id);

    if (updatedProject._id) {
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
            updatedProject,
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
