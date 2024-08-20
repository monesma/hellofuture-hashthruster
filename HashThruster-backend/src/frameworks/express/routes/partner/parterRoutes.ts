import express from 'express';
import dependencies from '../../../../config/dependencies';
import createPartnerController from '../../../../controllers/partner/createPartner.controller';
import loginPartnerController from '../../../../controllers/partner/loginPartner.controller';
import updatePartnerPasswordController from '../../../../controllers/partner/updatePartnerPassword.controller';
import { withAuth } from '../../middlewares/withAuth';

export const partnerRouter = express.Router();

partnerRouter.get('/', (req, res) => {
  res.json({ status: 200, msg: 'hello future' });
});
partnerRouter.post(
  '/',
  createPartnerController(dependencies).createPartnerController,
);

partnerRouter.post(
  '/login',
  loginPartnerController(dependencies).loginPartnerController
)

//ICI AJOUTER UNE ROUTE POUR ENVOYER UN MAIL DE MODIF DE SON PASSWORD AVEC SON ID

partnerRouter.put(
  '/updatePassword',
  updatePartnerPasswordController(dependencies).updatePartnerPasswordController
)