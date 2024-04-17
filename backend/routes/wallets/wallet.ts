import { Router } from 'express';
import WalletController from '../../controller/WalletController';

export const walletRouter = Router();

walletRouter.get('/api', WalletController.getWallets);
walletRouter.get('/api-user-id', WalletController.getWalletByUserId);
walletRouter.get('/api-user-pogs-info/:user_id', WalletController.getUserPogsInfo);
walletRouter.post('/api', WalletController.createWallet);
walletRouter.post('/api-buy-pogs', WalletController.buyPogs);
walletRouter.post('/api-sell-pogs', WalletController.sellPogs);
walletRouter.patch('/api/:id', WalletController.updateWallet);
walletRouter.delete('/api/:id', WalletController.deleteWallet);
