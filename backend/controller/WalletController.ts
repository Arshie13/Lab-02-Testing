import WalletService from "../service/WalletService";
import { Request, Response } from "express";

class WalletController {
  async getWallets(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const wallets = await WalletService.getWallets();
      if ('error' in wallets) {
        res.status(404).send(wallets.error);
      } else {
        res.status(200).send(wallets);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async getWalletByUserId(req: Request, res: Response) {
    const { user_id, pogs_id } = req.body;
    try {
      const wallet = await WalletService.getWalletByUserId(user_id, pogs_id);
      if ('error' in wallet) {
        res.status(404).send(wallet.error);
      } else {
        res.status(200).send(wallet);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async createWallet(req: Request, res: Response) {
    const data = req.body;
    try {
      const newWallet = await WalletService.createWallet(data.user_id, data.pog_id);
      res.status(201).send(newWallet);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async getUserPogsInfo(req: Request, res: Response) {
    const user_id = Number(req.params.user_id);
    try {
      const userPogsInfo = await WalletService.getUserPogsInfo(user_id);
      res.status(200).send(userPogsInfo);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async updateWallet(req: Request, res: Response) {
    const {user_id, pogs_id} = req.params;
    const data = req.body;
    try {
      const updatedWallet = await WalletService.updateWallet(Number(user_id), Number(pogs_id), data);
      res.status(200).send(updatedWallet);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async buyPogs(req: Request, res: Response) {
    const {user_id, pogs_id, quantity} = req.body;
    try {
      const boughtPogs = await WalletService.buyPogs(Number(user_id), Number(pogs_id), Number(quantity));
      res.status(200).send(boughtPogs);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async sellPogs(req: Request, res: Response) {
    const {user_id, pogs_id, quantity} = req.body;
    try {
      const soldPogs = await WalletService.sellPogs(Number(user_id), Number(pogs_id), Number(quantity));
      res.status(200).send(soldPogs);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }
  
  async deleteWallet(req: Request, res: Response) {
    const { user_id, pogs_id} = req.params;
    try {
      const deletedWallet = await WalletService.deleteWallet(Number(user_id), Number(pogs_id));
      res.status(200).send(deletedWallet);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }
}

export default new WalletController();