import { Router } from 'express';
import WalletController from '../../controller/WalletController';

export const walletRouter = Router();

walletRouter.get('/api', WalletController.getWallets);
walletRouter.get('/api/:id', WalletController.getWalletById);
walletRouter.get('/api-user-id', WalletController.getWalletByUserId);
walletRouter.post('/api', WalletController.createWallet);
walletRouter.patch('/api/:id', WalletController.updateWallet);
walletRouter.delete('/api/:id', WalletController.deleteWallet);
