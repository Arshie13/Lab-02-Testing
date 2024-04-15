import { PrismaClient } from "@prisma/client";
import { get } from "http";

const prisma = new PrismaClient();

class PogsDAO {
  async getAllPogs() {
    return await prisma.pogs.findMany();
  }

  async getPogsById(id: number) {
    return await prisma.pogs.findUnique({
      where: { id }
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
      let randomPrice = Math.floor(Math.random() * 1000);
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

// async function log() {
//   const Pogs = new PogsDAO();
//   await Pogs.updatePogsPriceToRandom();
//   console.log('Prices updated.');
// }

// log();
