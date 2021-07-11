import CreatePurchaseService from '@modules/purchases/services/CreatePurchaseService';
import DestroyPurchaseService from '@modules/purchases/services/DestroyPurchaseService';
import ListPurchasesService from '@modules/purchases/services/ListPurchasesService';
import UpdatePurchaseService from '@modules/purchases/services/UpdatePurchaseService';
import { sanitize } from '@shared/utils';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class PurchaseController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page, brand } = request.query;

    const purchaseService = container.resolve(ListPurchasesService);

    const purchases = await purchaseService.execute({
      brand: String(brand),
      page: Number(page),
    });

    return response.json(purchases);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id, quantity, brand_id, price } = request.body;

    const purchaseService = container.resolve(CreatePurchaseService);

    try {
      await purchaseService.execute({
        product_id,
        quantity,
        brand_id,
        price: sanitize(price, 'currency'),
      });

      return response.json({
        message:
          'Compra registrada com sucesso. Confira o seu histórico de compra!',
      });
    } catch (e) {
      return response.status(400).json({
        message:
          'Ocorreu um erro durante a criação da compra. Tente novamente!',
      });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { price, quantity } = request.body;

    const purchaseService = container.resolve(UpdatePurchaseService);

    const purchase = await purchaseService.execute({
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

    const purchaseService = container.resolve(DestroyPurchaseService);

    await purchaseService.execute(id);

    return response
      .status(200)
      .json({ message: `Histórico ${id} deletado com sucesso` });
  }
}

export default PurchaseController;
