import express from 'express';
import dependencies from '../../../../config/dependencies';
import createProjectController from '../../../../controllers/project/createProject.controller';
import readAllProjectsController from '../../../../controllers/project/readAllProjects.controller';
import readOneProjectController from '../../../../controllers/project/readOneProject.controller';
import updateProjectController from '../../../../controllers/project/updateProject.controller';
import deleteProjectController from '../../../../controllers/project/deleteProject.controller';
import updateProjectStatusController from '../../../../controllers/project/updateProjectStatus.controller';
import { withAuth } from '../../middlewares/withAuth';
import withAuthPki from '../../middlewares/withAuthPki';
import { isSuperAdmin } from '../../middlewares/isSuperAdmin';

export const projectRouter = express.Router();

projectRouter.get('/', (req, res) => {
  res.json({ status: 200, msg: 'hello future' });
});

projectRouter.post(
  '/',
  createProjectController(dependencies).createProjectController,
);

projectRouter.post(
  '/all',
  withAuth,
  withAuthPki,
  readAllProjectsController(dependencies).readAllProjectsController,
);

projectRouter.post(
  '/one/:id',
  withAuth,
  withAuthPki,
  readOneProjectController(dependencies).readOneProjectController,
);

projectRouter.put(
  '/update/:id',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  updateProjectController(dependencies).updateProjectController,
);

projectRouter.put(
  '/updateStatus/:id',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  updateProjectStatusController(dependencies).updateProjectStatusController,
);

projectRouter.post(
  '/delete/:id',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  deleteProjectController(dependencies).deleteProjectController,
);
