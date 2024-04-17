import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PogsDAO {
  async getAllPogs() {
    return await prisma.pogs.findMany();
  }

  async getPogsById(pogs_id: number) {
    return await prisma.pogs.findUnique({
      where: {
        id: pogs_id
      }
    });
  }

  async getPogsByTickerSymbol(ticker_symbol: string) {
    return await prisma.pogs.findUnique({
      where: { ticker_symbol }
    });
  }

  async createPogs(data: any) {
    return await prisma.pogs.create(data);
  }

  async updatePogs(id: number, data: any) {
    return await prisma.pogs.update({
      where: { id },
      data
    });
  }

  async updatePogsPriceToRandom() {
    const pogsList = await this.getAllPogs();
    for (let pog of pogsList) {
      let currentPogPrice = pog.price;
      let randomPrice = Math.ceil(Math.random() * 1000);
      await this.updatePogs(pog.id, { price: randomPrice, previous_price: currentPogPrice});
    }
  }

  async deletePogs(id: number) {
    return await prisma.pogs.delete({
      where: { id }
    });
  }
}

export default new PogsDAO();

// const Pogsdao = new PogsDAO();

// async function log() {
//   const getPogs = await Pogsdao.getPogsById(13);
//   console.log('PogsDAO create pogs:', getPogs);
// }

// log();