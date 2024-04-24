import WalletDAO from "../dao/WalletDAO";
import UserDAO from "../dao/UserDAO";
import PogsDAO from "../dao/PogsDAO";

interface IWallet {
  user_id: number;
  pogs_id: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

class WalletService {
  async getWallets() {
    try {
      const wallets = await WalletDAO.getWallets();
      if (wallets.length === 0) {
        return { error: 'No wallets found.' };
      } else {
        return wallets;
      }
    } catch (error) {
      console.error("get wallets error: ", error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getWalletByUserId(user_id: number, pogs_id: number) {
    if (!user_id) {
      return { error: 'Bad Request.' };
    }
    try {
      const wallet = await WalletDAO.getWalletByUserId(user_id, pogs_id);
      if (!wallet) {
        return { error: 'Wallet not found.' };
      } else {
        return wallet;
      }
    } catch (error) {
      console.error('Get wallet by user id: ', error)
      return { error: 'Internal Server Error.' };
    }
  }

  async createWallet(user_id: number, pog_id: number) {
    if (!user_id || !pog_id) {
      return { error: 'Bad Request.' };
    }
    try {
      const newWallet = await WalletDAO.createWallet(user_id, pog_id);
      return newWallet;
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async updateWallet(user_id: number, pogs_id: number, data: any) {
    if (!user_id || !data || Object.keys(data).length === 0) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkWallet = await WalletDAO.getWalletByUserId(user_id, pogs_id);
      if (!checkWallet || data.user_id !== checkWallet.user_id) {
        return { error: 'Wallet not found.' };
      } else {
        const updatedWallet = await WalletDAO.updateWallet(user_id, pogs_id, data);
        return updatedWallet;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async buyPogs(user_id: number, pogs_id: number, quantity: number) {
    const user = await UserDAO.getUserById(user_id);
    const pog = await PogsDAO.getPogsById(pogs_id);
    if (!user_id || !pogs_id || !quantity || !user || !pog) {
      return { error: 'Bad Request.' };
    }
    let wallet = await WalletDAO.getWalletByUserId(user_id, pogs_id);
    if (!wallet || wallet === null || wallet === undefined) {
      const newBalance = user.balance - (quantity * pog.price);
      if (newBalance < 0) {
        return { error: 'Not enough balance to buy Pogs.' };
      }
      await WalletDAO.createWallet(user_id, pogs_id).then(async () => {
        await WalletDAO.updateWallet(user_id, pogs_id, { quantity: quantity });
        await UserDAO.updateUser(user_id, { balance: newBalance });
      });
      return WalletDAO.getWalletByUserId(user_id, pogs_id);
    } else {
      const newBalance = user.balance - (quantity * pog.price);
      const newQuantity = wallet.quantity + quantity;
      await WalletDAO.updateWallet(user_id, pogs_id, { quantity: newQuantity }).then(async () => {
        await UserDAO.updateUser(user_id, { balance: newBalance });
      });
      return WalletDAO.getWalletByUserId(user_id, pogs_id);
    }
  }

  async sellPogs(user_id: number, pogs_id: number, quantity: number) {
    const user = await UserDAO.getUserById(user_id);
    const pog = await PogsDAO.getPogsById(pogs_id);
    if (!user_id || !pogs_id || !quantity || !user || !pog) {
      return { error: 'Bad Request.' };
    }
    let wallet = await WalletDAO.getWalletByUserId(user_id, pogs_id);
    const newBalance = user.balance + (quantity * pog.price);
    const newQuantity = wallet.quantity - quantity;
    if (newQuantity <= 0) {
      WalletDAO.deleteWallet(wallet.id);
      return
    }
    await WalletDAO.updateWallet(user_id, pogs_id, { quantity: newQuantity }).then(async () => {
      await UserDAO.updateUser(user_id, { balance: newBalance });
    });
    return WalletDAO.getWalletByUserId(user_id, pogs_id);
  }

  async getUserPogsInfo(user_id: number) {
    if (!user_id) {
      return { error: 'Bad Request.' };
    }
    try {
      const user = await UserDAO.getUserById(user_id);
      if (!user) {
        return { error: 'User not found.' };
      } else {
        const userPogsInfo = await WalletDAO.getUserPogsInfo(user_id);
        if (userPogsInfo.length === 0) {
          return { error: 'No Pogs found.' };
        } else {
          return userPogsInfo;
        }
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async deleteWallet(user_id: number, pogs_id: number) {
    if (!user_id) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkWallet = await WalletDAO.getWalletByUserId(user_id, pogs_id);
      if (!checkWallet) {
        return { error: 'Wallet not found.' };
      } else {
        const deletedWallet = await WalletDAO.deleteWallet(user_id);
        return deletedWallet;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }
}

export default new WalletService();