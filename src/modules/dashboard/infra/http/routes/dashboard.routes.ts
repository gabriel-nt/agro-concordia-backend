import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import DashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();
const dashboardController = new DashboardController();

dashboardRouter.use(ensureAuthenticated);

dashboardRouter.get('/', dashboardController.index);
dashboardRouter.get('/reports', dashboardController.reports);

export default dashboardRouter;
