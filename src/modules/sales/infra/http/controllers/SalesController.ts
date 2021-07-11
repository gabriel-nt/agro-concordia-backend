import { sanitize } from '@shared/utils';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSaleService from '@modules/sales/services/CreateSaleService';
import UpdateSaleService from '@modules/sales/services/UpdateSaleService';
import DestroySaleService from '@modules/sales/services/DestroySaleService';
import ListSalesService from '@modules/sales/services/ListSalesService';

class SalesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, brand } = request.query;

    const saleService = container.resolve(ListSalesService);

    const sales = await saleService.execute({
      brand: String(brand),
      page: Number(page),
    });

    return response.json(sales);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id, brand_id, quantity, price } = request.body;

    const saleService = container.resolve(CreateSaleService);

    try {
      await saleService.execute({
        product_id,
        quantity,
        brand_id,
        price: sanitize(price, 'currency'),
      });

      return response.json({
        message:
          'Compra registrada com sucesso. Confira o seu histórico de venda!',
      });
    } catch (e) {
      console.log(e);

      return response.status(500).json({
        message: 'Ocorreu um erro durante a criação da venda. Tente novamente!',
      });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { price, quantity } = request.body;

    const saleService = container.resolve(UpdateSaleService);

    const purchase = await saleService.execute({
      id,
      price: sanitize(price, 'currency'),
      quantity,
    });

    return response.json(purchase);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const saleService = container.resolve(DestroySaleService);

    await saleService.execute(id);

    return response
      .status(201)
      .json({ message: `Histórico ${id} deletado com sucesso` });
  }
}

export default SalesController;
