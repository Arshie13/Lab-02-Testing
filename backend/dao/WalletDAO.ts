import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class WalletDAO {
  async getWallets() {
    return prisma.wallet.findMany();
  }

  async getWalletById(id: number) {
    return prisma.wallet.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getWalletByUserId(user_id: number) {
    const wallet = await prisma.wallet.findMany({
      where: {
        user_id: user_id
      },
    });
    return wallet[0];
  }

  async createWallet(data: any) {
    const wallet = prisma.wallet.create({
      data: data,
    });

    return wallet;
  }

  async updateWallet(id: number, data: any) {
    return prisma.wallet.update({
      where: {
        id: id,
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