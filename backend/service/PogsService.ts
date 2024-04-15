import PogsDAO from '../dao/PogsDAO';

class PogsService {
  async getPogsById(id: number) {
    if (!id) return { error: 'Bad Request.' };

    try {
      const pogs = await PogsDAO.getPogsById(id);
      if (!pogs) {
        return { error: 'Pogs not found.' };
      } else {
        return pogs;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getPogsByTickerSymbol(ticker_symbol: string) {
    if (!ticker_symbol) return { error: 'Bad Request.' };

    try {
      const pogs = await PogsDAO.getPogsByTickerSymbol(ticker_symbol);
      if (!pogs) {
        return { error: 'Pogs not found.' };
      } else {
        return pogs;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async getAllPogs() {
    try {
      let pogs = await PogsDAO.getAllPogs();
      if (pogs.length === 0) {
        return { error: 'No pogs found.' };
      } else {
        return pogs;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async createPogs(data: any) {
    if (!data) return { error: 'Bad Request.' };

    try {
      const newPogs = await PogsDAO.createPogs(data);
      return newPogs;
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async updatePogs(id: number, data: any) {
    if (!id || !data || Object.keys(data).length === 0) return { error: 'Bad Request.' };

    try {
      const checkPogs = await PogsDAO.getPogsById(id);

      if (!checkPogs) {
        return { error: 'Pogs not found.' };
      } else {
        const updatedPogs = await PogsDAO.updatePogs(id, data);
        return updatedPogs;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async updatePogsPriceToRandom() {
    try {
      const pogs = await PogsDAO.getAllPogs();
      if (pogs.length === 0) {
        return { error: 'No pogs found.' };
      } else {
        PogsDAO.updatePogsPriceToRandom();
        return { message: 'Prices updated.' };
      }
    } catch (error) {
      console.error(error);
      return { error: 'Internal Server Error.' };
    }
  }

  async deletePogs(id: number) {
    if (!id) return { error: 'Bad Request.' };

    try {
      const checkPogs = await PogsDAO.getPogsById(id);
      if (!checkPogs) return { error: 'Pogs not found.' };
      else {
        const deletedPogs = await PogsDAO.deletePogs(id);
        return deletedPogs;
      }
    } catch (error) {
      console.error(error);
      return { error: 'Pogs not found.' };
    }
  }
}

export default new PogsService();

// const pogsService = new PogsService();

// async function log() {
//   // const createPogs = await pogsService.createPogs({
//   //   pogs_name: 'Pogs',
//   //   ticker_symbol: 'POGS',
//   //   price: 100,
//   //   color: 'Blue',
//   // });
//   // console.log('PogsService create test:', createPogs);
//   // console.log('\n');

//   const getAllPogs = await pogsService.getAllPogs();
//   if (!Array.isArray(getAllPogs)) {
//     console.log(getAllPogs.error);
//   } else {
//     const updatedPogs = await pogsService.updatePogs(getAllPogs[0].id, {
//       pogs_name: 'new Pogs',
//       ticker_symbol: 'NP',
//       price: 101,
//       color: 'Blue'
//     });

//     console.log('PogsService get all test:', getAllPogs.forEach(pogs => console.log(pogs)));
//     console.log('\n');
//     console.log('PogsService get by id test:', await pogsService.getPogsById(getAllPogs[0].id));
//     console.log('\n');
//     console.log('PogsService get by tckrsmbl: ', await pogsService.getPogsByTickerSymbol(getAllPogs[0].ticker_symbol));
//     console.log('\n');
//     console.log('PogsService update pogs test: ', updatedPogs);
//     console.log('\n');
//     console.log('PogsService delete test: ', await pogsService.deletePogs(getAllPogs[0].id));
//   }
// }

// log();