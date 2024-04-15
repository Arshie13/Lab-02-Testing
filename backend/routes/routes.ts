import express from 'express';
import { userRouter } from './user/User';
import { pogsRouter } from './pogs/pogs';
import { walletRouter } from './wallets/wallet';

export const router = express.Router();

router.use('/user', userRouter);
router.use('/pogs', pogsRouter);
router.use('/wallet', walletRouter);
