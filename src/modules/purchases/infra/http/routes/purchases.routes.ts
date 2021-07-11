import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import PurchaseController from '../controllers/PurchaseController';

const purchasesRouter = Router();
const purchasesController = new PurchaseController();

purchasesRouter.use(ensureAuthenticated);

purchasesRouter.get('/', purchasesController.index);
purchasesRouter.post('/', purchasesController.create);
purchasesRouter.put('/:id', purchasesController.update);
purchasesRouter.delete('/:id', purchasesController.destroy);

export default purchasesRouter;
