import WalletDAO from "../dao/WalletDAO";

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
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getWalletById(id: number) {
    if (!id) {
      return { error: 'Bad Request.' };
    }
    try {
      const wallet = await WalletDAO.getWalletById(id);
      if (!wallet) {
        return { error: 'Wallet not found.' };
      } else {
        return wallet;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getWalletByUserId(user_id: number) {
    if (!user_id) {
      return { error: 'Bad Request.' };
    }
    try {
      const wallet = await WalletDAO.getWalletByUserId(user_id);
      if (!wallet) {
        console.error('Get wallet by user id (DAO): ', user_id)
        return { error: 'Wallet not found.' };
      } else {
        return wallet;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async createWallet(data: any) {
    if (!data) {
      return { error: 'Bad Request.' };
    }
    try {
      const newWallet = await WalletDAO.createWallet(data);
      return newWallet;
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async updateWallet(id: number, data: any) {
    if (!id || !data || Object.keys(data).length === 0) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkWallet = await WalletDAO.getWalletById(id);
      if (!checkWallet || data.user_id !== checkWallet.user_id) {
        return { error: 'Wallet not found.' };
      } else {
        const updatedWallet = await WalletDAO.updateWallet(id, data);
        return updatedWallet;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async deleteWallet(id: number) {
    if (!id) {
      return { error: 'Bad Request.' };
    }
    try {
      const checkWallet = await WalletDAO.getWalletById(id);
      if (!checkWallet) {
        return { error: 'Wallet not found.' };
      } else {
        const deletedWallet = await WalletDAO.deleteWallet(id);
        return deletedWallet;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }
}

export default new WalletService();