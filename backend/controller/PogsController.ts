import { Request, Response } from 'express';
import PogsService from '../service/PogsService';

class PogsController {
  async getAllPogs(req: Request, res: Response) {
    try {
      const pogs = await PogsService.getAllPogs();
      if ('error' in pogs) {
        res.status(404).send(pogs.error);
      } else {
        res.status(200).send(pogs);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async getPogsById(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const pogs = await PogsService.getPogsById(id);
      if ('error' in pogs) {
        res.status(404).send(pogs.error);
      } else {
        res.status(200).send(pogs);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async getPogsByTickerSymbol(req: Request, res: Response) {
    const ticker_symbol = req.body.ticker_symbol;
    try {
      const pogs = await PogsService.getPogsByTickerSymbol(ticker_symbol);
      if ('error' in pogs) {
        res.status(404).send(pogs.error);
      } else {
        res.status(200).send(pogs);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async createPogs(req: Request, res: Response) {
    const data = req.body;
    try {
      const newPogs = await PogsService.createPogs({ data });
      if ('error' in newPogs) {
        res.status(422).send(newPogs.error);
      } else res.status(201).send(newPogs);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async updatePogs(req: Request, res: Response) {
    const id = Number(req.params.id);
    const data = req.body;
    try {
      const updatedPog = await PogsService.updatePogs(id, data)
      if ('error' in updatedPog) {
        res.status(422).send(updatedPog.error);
      } else {
        res.status(200).send(updatedPog);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error.');
    }
  }

  async updatePogsPriceToRandom(req: Request, res: Response) {
    try {
      const updatedPog = await PogsService.updatePogsPriceToRandom();
      if ('error' in updatedPog) {
        res.status(404).send(updatedPog.error);
      } else {
        res.status(200).send(updatedPog);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deletePogs(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const deletedPogs = await PogsService.deletePogs(id);
      if ('error' in deletedPogs) {
        res.status(404).send(deletedPogs.error);
      } else {
        res.status(200).send(deletedPogs);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new PogsController();