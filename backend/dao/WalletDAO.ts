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
      include: {
        user: {
          select: {
            username: true,
          },
        },
        pogs: {
          select: {
            id: true,
            pogs_name: true,
            ticker_symbol: true,
            color: true,
            price: true,
            previous_price: true,
          },
        }
      },
    });

    // Process the userWalletInfo to include all properties of each pog in one object
    const formattedUserWalletInfo = userWalletInfo.map(entry => {
      const formattedPog = {
        ...entry.pogs,
        username: entry.user.username,
        quantity: entry.quantity,
      };
      return formattedPog;
    });

    return formattedUserWalletInfo;
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
    return prisma.wallet.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new WalletDAO();