import {
  CreateProjectQuery,
  UpdateProjectQuery,
  UpdateProjectStatusQuery,
} from '../../../../domain/dto/project/project-dto';
import ProjectModel from '../../../database/mongo/schema/project.schema';
import { ProjectQuery } from '../../../../domain/types/project-types';
import { adapterMongoDataProject } from '../../../adapter/mongo/project/project.adapter';

export default {
  add: async (project: CreateProjectQuery): Promise<ProjectQuery | null> => {
    try {
      const newProject = new ProjectModel(project);
      const createdProjectMongo = await newProject.save();

      const createdNewProject = adapterMongoDataProject(createdProjectMongo);
      return createdNewProject;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  getAll: async () => {
    try {
      return await ProjectModel.find({});
    } catch (err) {
      return err;
    }
  },
  getById: async (id: string) => {
    try {
      const response = await ProjectModel.findOne({ _id: id });
      if (response !== null) {
        return adapterMongoDataProject(response);
      } else {
        return response;
      }
    } catch (err) {
      return err;
    }
  },
  updateProjectQuery: async (
    projectInfo: UpdateProjectQuery,
    id: string,
  ): Promise<ProjectQuery | null> => {
    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        id,
        { $set: { ...projectInfo } },
        { new: true },
      ).exec();

      if (updatedProject) {
        return adapterMongoDataProject(updatedProject);
      }

      return null;
    } catch (err) {
      console.error('Error updating project:', err); // Affichage des erreurs pour débogage
      return null;
    }
  },
  updateProjectStatusQuery: async (
    projectStatus: UpdateProjectStatusQuery,
    id: string,
  ) => {
    try {
      const response = await ProjectModel.updateOne(
        { _id: id },
        {
          $set: {
            status: projectStatus.status,
          },
        },
        { new: true }
      ).exec();
      if (response.modifiedCount === 1) {
        const res = await ProjectModel.findOne({ _id: id });
        const projectById = adapterMongoDataProject(res);
        return projectById;
      } else {
        return null;
      }
    } catch (err) {
      return err;
    }
  },
  delete: async (id: string) => {
    try {
      const response = await ProjectModel.deleteOne({ _id: id });

      if (response.deletedCount === 1) {
        return id;
      } else {
        return null;
      }
    } catch (err) {
      return err;
    }
  },
};
