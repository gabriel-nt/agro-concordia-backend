import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import BrandController from '../controllers/BrandController';

const brandRouter = Router();
const upload = multer(uploadConfig.multer);
const brandController = new BrandController();

brandRouter.use(ensureAuthenticated);

brandRouter.get('/', brandController.index);
brandRouter.post(
  '/',
  upload.fields([
    {
      name: 'image',
    },
    {
      name: 'backgroundImage',
    },
  ]),
  brandController.create,
);
brandRouter.get('/:id', brandController.show);
brandRouter.put(
  '/:id',
  upload.fields([
    {
      name: 'image',
    },
    {
      name: 'backgroundImage',
    },
  ]),
  brandController.update,
);
brandRouter.delete(':/id', brandController.delete);

export default brandRouter;
