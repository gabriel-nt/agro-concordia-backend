import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProductPerBrandService from '@modules/dashboard/services/ListProductPerBrandService';
import ListSalesAndPurchasesLastWeekService from '@modules/dashboard/services/ListSalesAndPurchasesLastWeekService';

class DashboardController {
  public async index(request: Request, response: Response): Promise<Response> {
    const dashboardService = container.resolve(ListProductPerBrandService);

    const productsBrands = await dashboardService.execute();

    return response.json(productsBrands);
  }

  public async reports(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const dashboardService = container.resolve(
      ListSalesAndPurchasesLastWeekService,
    );

    const productsBrands = await dashboardService.execute();

    return response.json(productsBrands);
  }
}

export default DashboardController;
