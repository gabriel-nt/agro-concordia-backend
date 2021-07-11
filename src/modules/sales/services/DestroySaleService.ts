import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ISalesRepository from '../repositories/ISalesRepository';

@injectable()
class DestroySaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<boolean | undefined> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError('Sale not found');
    }

    await this.salesRepository.destroy(id);
    await this.cacheProvider.invalidate('sales');
    await this.cacheProvider.invalidate('products');

    const productStock = await this.productsRepository.findProductStockById(
      sale.productId,
    );

    if (productStock) {
      const { stock } = productStock;
      const oldQuantity = sale.quantity;

      await this.productsRepository.updateStock({
        id: stock.id,
        stock: Number(stock.stock) - Number(oldQuantity),
      });
    }

    return true;
  }
}

export default DestroySaleService;
