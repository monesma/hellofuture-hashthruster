import ResponseRequest from '../../frameworks/common/ResponseRequest';
import ResponseError from '../../frameworks/common/ResponseError';
import { UpdateProjectStatusQuery } from '../../domain/dto/project/project-dto';

export default (dependencies: any) => {
  const { projectRepository } = dependencies;
  if (!projectRepository) {
    throw new Error('The project repository should exist in dependencies');
  }

  const execute = async (
    projectStatus: 'pending' | 'approved' | 'rejected' | 'listed',
    id: string
  ): Promise<ResponseRequest> => {

    const completeProject: UpdateProjectStatusQuery = {
      status: projectStatus
    };
    const updatedProject = await projectRepository.updateProjectStatusQuery(completeProject, id);

    if (updatedProject.status) {
      return new ResponseRequest({
        status: 200,
        error: null,
        content: {
          status: updatedProject.status,
        },
      });
    }

    return new ResponseRequest({
      status: 500,
      error: new ResponseError({
        error: 'internal error',
        msg: 'A problem occurred',
      }),
      content: null,
    });
  };

  return { execute };
};
