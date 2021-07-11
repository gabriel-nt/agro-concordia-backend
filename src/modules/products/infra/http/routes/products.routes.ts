import multer from 'multer';
import { Router } from 'express';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const upload = multer(uploadConfig.multer);
const productsController = new ProductsController();
productsRouter.use(ensureAuthenticated);

productsRouter.get('/', productsController.index);
productsRouter.post('/', upload.single('image'), productsController.create);
productsRouter.get('/:id', productsController.show);
productsRouter.put('/:id', upload.single('image'), productsController.update);
productsRouter.delete('/:id', productsController.delete);

export default productsRouter;
