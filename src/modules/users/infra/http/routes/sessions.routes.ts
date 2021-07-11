import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.get(
  '/',
  ensureAuthenticated,
  sessionsController.authenticatedUser,
);
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
