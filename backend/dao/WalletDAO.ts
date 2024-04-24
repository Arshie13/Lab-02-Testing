import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class WalletDAO {

  async getWallets() {
    return prisma.wallet.findMany();
  }

  async getWalletByUserId(user_id: number, pogs_id: number) {
    const wallet = await prisma.wallet.findMany({
      where: {
        user_id: user_id,
        pogs_id: pogs_id
      },
    });
    return wallet[0];
  }

  async getUserPogsInfo(user_id: number) {
    const userWalletInfo = await prisma.wallet.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        quantity: true,
        pogs: {
          select: {
            id: true,
            pogs_name: true,
            ticker_symbol: true,
            price: true,
            color: true,
            previous_price: true,
          },
        },
      },
    });
    // Initialize an object to store the combined information
    const userPogsInfo = userWalletInfo.map((wallet) => ({
      id: wallet.pogs.id,
      pogs_name: wallet.pogs.pogs_name,
      ticker_symbol: wallet.pogs.ticker_symbol,
      price: wallet.pogs.price,
      color: wallet.pogs.color,
      previous_price: wallet.pogs.previous_price,
      quantity: wallet.quantity ?? 0,
    }));

    return userPogsInfo;
  }


  async createWallet(user_id: number, pog_id: number) {
    const wallet = await prisma.wallet.create({
      data: {
        user_id,
        pogs_id: pog_id
      },
    });
    return wallet;
  }

  async updateWallet(user_id: number, pogs_id: number, data: any) {
    const userWallet = await this.getWalletByUserId(user_id, pogs_id);
    return prisma.wallet.update({
      where: {
        id: userWallet.id,
      },
      data: data,
    });
  }

  async deleteWallet(id: number) {
    const wallet = await prisma.wallet.findUnique({
      where: {
        id: id,
      },
    });

    if (!wallet) {
      throw new Error(`Wallet with id ${id} does not exist`);
    }

    return prisma.wallet.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new WalletDAO();

// const walletDAO = new WalletDAO();

// async function log() {
//   console.log(await walletDAO.getUserPogsInfo(21))
// }

// log()