import { Router } from 'express';
import PogsController from '../../controller/PogsController';

export const pogsRouter = Router();

pogsRouter.get('/api', PogsController.getAllPogs);
pogsRouter.get('/api/:id', PogsController.getPogsById);
pogsRouter.get('/api-ticker-symbol', PogsController.getPogsByTickerSymbol);
pogsRouter.post('/api', PogsController.createPogs);
pogsRouter.put('/api/:id', PogsController.updatePogs);
pogsRouter.patch('/api/update-prices', PogsController.updatePogsPriceToRandom);
pogsRouter.delete('/api/:id', PogsController.deletePogs);
