import express from 'express';
import dependencies from '../../../../config/dependencies';
import createTokenController from '../../../../controllers/token/createToken.controller';
import readAllTokensController from '../../../../controllers/token/readAllTokens.controller';
import readOneTokenController from '../../../../controllers/token/readOneToken.controller';
import readOneWalletFromTokenController from '../../../../controllers/token/readOneWalletFromToken.controller';
import updateTokenController from '../../../../controllers/token/updateToken.controller';
import deleteTokenController from '../../../../controllers/token/deleteToken.controller';
import { withAuth } from '../../middlewares/withAuth';
import { isSuperAdmin } from '../../middlewares/isSuperAdmin';
import withAuthPki from '../../middlewares/withAuthPki';
import deleteWalletFromTokenController from '../../../../controllers/token/deleteWalletFromToken.controller';

export const tokenRouter = express.Router();

tokenRouter.get('/', (req, res) => {
  res.json({ status: 200, msg: 'hello future' });
});

tokenRouter.post(
  '/',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  createTokenController(dependencies).createTokenController,
);

tokenRouter.get(
  '/all',
  readAllTokensController(dependencies).readAllTokensController,
);

tokenRouter.get(
  '/one/:id',
  readOneTokenController(dependencies).readOneTokenController,
);

tokenRouter.post(
  '/wallet/:id',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  readOneWalletFromTokenController(dependencies).readOneWalletFromTokenController,
);

tokenRouter.put(
  '/update/:id',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  updateTokenController(dependencies).updateTokenController,
);

tokenRouter.post(
  '/wallet/delete/:id',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  deleteWalletFromTokenController(dependencies).deleteWalletFromTokenController,
);

tokenRouter.post(
  '/delete/:id',
  withAuth,
  withAuthPki,
  isSuperAdmin,
  deleteTokenController(dependencies).deleteTokenController,
);
