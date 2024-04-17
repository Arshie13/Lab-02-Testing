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
