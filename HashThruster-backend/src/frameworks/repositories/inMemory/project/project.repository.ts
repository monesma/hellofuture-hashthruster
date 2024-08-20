import database from '../../../database/inMemory';
import {
  CreateProjectQuery,
  UpdateProjectQuery,
  UpdateProjectStatusQuery
} from '../../../../domain/dto/project/project-dto';
import mongoose from 'mongoose';
import { ProjectQuery } from '../../../../domain/types/project-types';

export default {
  add: async (project: CreateProjectQuery) => {
    const completeProject: ProjectQuery = {
      _id: new mongoose.Types.ObjectId().toString(),
      ...project,
      creation_date: project.creation_date ?? new Date(),
      status: 'pending'
    };
    database.project.push(completeProject);
    return database.project[database.project.length - 1];
  },
  getAll: async () => {
    return database.project;
  },
  getById: async (id: string) => {
    return database.project.find((p) => {
      return p._id === id;
    });
  },
  updateProjectQuery: async (projectInfo: UpdateProjectQuery, id: string) => {
    const index = database.project.findIndex((p) => {
      return p._id === id;
    });

    const updatedProject = {
      ...database.project[index],
      ...projectInfo,
    };

    database.project[index] = updatedProject;
    return database.project[index];
  },
  updateProjectStatusQuery: async (
    projectStatus: UpdateProjectStatusQuery,
    id: string
  ) => {
    const index = database.project.findIndex((p) => {
      return p._id === id;
    });

    const updatedProject = {
      ...database.project[index],
      ...projectStatus,
    };

    database.project[index] = updatedProject;
    return database.project[index];
  },
  delete: async (id: string) => {
    const index = database.project.findIndex((p) => {
      return p._id === id;
    });
    if (index !== -1) {
      database.project.splice(index, 1);
      return id;
    }
    return null;
  },
};
