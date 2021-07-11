import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import SalesController from '../controllers/SalesController';

const salesRouter = Router();
const salesController = new SalesController();

salesRouter.use(ensureAuthenticated);

salesRouter.get('/', salesController.index);
salesRouter.post('/', salesController.create);
salesRouter.put('/:id', salesController.update);
salesRouter.delete('/:id', salesController.destroy);

export default salesRouter;
