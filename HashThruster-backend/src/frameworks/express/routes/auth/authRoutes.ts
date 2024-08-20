import express from 'express';
import dependencies from '../../../../config/dependencies';
import authenticatePartnerController from '../../../../controllers/auth/authenticatePartner.controller';
import newAccessTokenPartnerController from '../../../../controllers/auth/newAccessTokenPartner.controller';
import authenticateAdminController from '../../../../controllers/auth/authenticateAdmin.controller';
import newAccessTokenAdminController from '../../../../controllers/auth/newAccessTokenAdmin.controller';

export const authRouter = express.Router();

authRouter.get('/pki', (req, res) => {
  res.json({ status: 200, msg: 'hello future' });
});

authRouter.post(
  '/getAccessPartner',
  authenticatePartnerController(dependencies).authenticatePartnerController,
);
authRouter.post(
  '/refreshAccessPartner',
  newAccessTokenPartnerController(dependencies).authenticatePartnerController,
);

authRouter.post(
  '/getAccessAdmin',
  authenticateAdminController(dependencies).authenticateAdminController,
);

authRouter.post(
  '/refreshAccessAdmin',
  newAccessTokenAdminController(dependencies).authenticateAdminController,
);
