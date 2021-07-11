import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import brandRouter from '@modules/brands/infra/http/routes/brands.routes';
import purchasesRouter from '@modules/purchases/infra/http/routes/purchases.routes';
import salesRouter from '@modules/sales/infra/http/routes/sales.routes';
import dashboardRouter from '@modules/dashboard/infra/http/routes/dashboard.routes';
import itensRouter from '@modules/products/infra/http/routes/itens.routes';

const routes = Router();

routes.use('/itens', itensRouter);
routes.use('/users', usersRouter);
routes.use('/brands', brandRouter);
routes.use('/login', sessionsRouter);
routes.use('/products', productsRouter);
routes.use('/purchases', purchasesRouter);
routes.use('/sales', salesRouter);
routes.use('/dashboard', dashboardRouter);

export default routes;
