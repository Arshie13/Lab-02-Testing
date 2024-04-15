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

  async getWalletById(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const wallet = await WalletService.getWalletById(id);
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

  async getWalletByUserId(req: Request, res: Response) {
    const user_id = Number(req.body.user_id);
    try {
      const wallet = await WalletService.getWalletByUserId(user_id);
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
      const newWallet = await WalletService.createWallet(data);
      res.status(201).send(newWallet);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async updateWallet(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    try {
      const updatedWallet = await WalletService.updateWallet(id, data);
      res.status(200).send(updatedWallet);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async deleteWallet(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const deletedWallet = await WalletService.deleteWallet(id);
      res.status(200).send(deletedWallet);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }
}

export default new WalletController();