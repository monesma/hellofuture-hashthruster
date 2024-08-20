import express from 'express';
import { partnerRouter } from './partner/parterRoutes';
import { authRouter } from './auth/authRoutes';
import { adminRouter } from './admin/adminRoutes';
import { projectRouter } from './project/projectRoutes'
import { tokenRouter } from './token/tokenRoutes'

export const router = express.Router();

router.use('/partner', partnerRouter);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/project', projectRouter);
router.use('/token', tokenRouter);
