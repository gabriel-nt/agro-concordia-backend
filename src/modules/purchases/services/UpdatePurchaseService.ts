import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import AppError from '@shared/errors/AppError';
import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

interface IRequest {
  id: string;
  quantity: number;
  price: string;
}

@injectable()
class UpdatePurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, quantity, price }: IRequest): Promise<Purchase> {
    const purchase = await this.purchasesRepository.findById(id);

    if (!purchase) {
      throw new AppError(`Puchase with id ${id} not found`);
    }

    const oldQuantity = purchase.quantity;

    Object.assign(purchase, {
      price,
      quantity,
    });

    await this.purchasesRepository.save(purchase);
    await this.cacheProvider.invalidatePrefix('products');
    await this.cacheProvider.invalidatePrefix('purchases');

    const productStock = await this.productsRepository.findProductStockById(
      purchase.productId,
    );

    if (productStock) {
      const { stock } = productStock;

      console.log(stock);
      console.log(oldQuantity);
      console.log(quantity);

      await this.productsRepository.updateStock({
        id: stock.id,
        stock: Number(stock.stock) - Number(oldQuantity) + Number(quantity),
      });
    }

    return purchase;
  }
}

export default UpdatePurchaseService;
