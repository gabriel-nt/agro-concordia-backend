import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ItensController from '../controllers/ItensController';

const itensRouter = Router();
const itensController = new ItensController();

itensRouter.use(ensureAuthenticated);
itensRouter.get('/', itensController.getProductsByBrand);

export default itensRouter;
