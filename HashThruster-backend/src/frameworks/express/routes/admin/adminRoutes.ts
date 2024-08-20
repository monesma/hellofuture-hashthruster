import express from 'express';
import dependencies from '../../../../config/dependencies';
import createAdminController from '../../../../controllers/admin/createAdmin.controller';
import loginAdminController from '../../../../controllers/admin/loginAdmin.controller';
import updateAdminPasswordController from '../../../../controllers/admin/updateAdminPassword.controller';
import checkAdminTokenController from '../../../../controllers/admin/checkAdminToken.controller';
import checkAdminRefreshtokenController from '../../../../controllers/admin/checkAdminRefreshtoken.controller';
import readAllAdminController from '../../../../controllers/admin/readAllAdminController.controller';
import updateAdminStatusController from '../../../../controllers/admin/updateAdminStatus.controller';
import withAuthPki from '../../middlewares/withAuthPki';
import { withAuth } from '../../middlewares/withAuth';
import { isSuperAdmin } from '../../middlewares/isSuperAdmin';

export const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
  res.json({ status: 200, msg: 'hello future' });
});

adminRouter.post('/allAdmin',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  readAllAdminController(dependencies).readAllAdminController,
);

adminRouter.post(
  '/',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  createAdminController(dependencies).createAdminController,
);

adminRouter.post(
  '/login',
  loginAdminController(dependencies).loginAdminController,
);

adminRouter.put(
  '/updatePassword',
  withAuth,
  updateAdminPasswordController(dependencies).updateAdminPasswordController,
);

adminRouter.put(
  '/updateStatus',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  updateAdminStatusController(dependencies).updateAdminStatusController,
);

adminRouter.get(
  '/checkToken',
  withAuth,
  checkAdminTokenController(dependencies).checkAdminTokenController,
);

adminRouter.post(
  '/checkRefreshTokenAdmin',
  withAuth,
  withAuthPki,
  checkAdminRefreshtokenController().checkAdminRefreshTokenController,
);
