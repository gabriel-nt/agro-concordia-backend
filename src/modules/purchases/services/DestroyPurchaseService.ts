import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

@injectable()
class DestroyPurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<boolean | undefined> {
    const purchase = await this.purchasesRepository.findById(id);

    if (!purchase) {
      throw new AppError('Purchase not found');
    }

    await this.purchasesRepository.destroy(id);
    await this.cacheProvider.invalidatePrefix('products');
    await this.cacheProvider.invalidatePrefix('purchases');

    const productStock = await this.productsRepository.findProductStockById(
      purchase.productId,
    );

    if (productStock) {
      const { stock } = productStock;
      const oldQuantity = purchase.quantity;

      await this.productsRepository.updateStock({
        id: stock.id,
        stock: Number(stock.stock) - Number(oldQuantity),
      });
    }

    return true;
  }
}

export default DestroyPurchaseService;
