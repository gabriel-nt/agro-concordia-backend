import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { injectable, inject } from 'tsyringe';

import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

interface IRequest {
  product_id: string;
  quantity: number;
  price: string;
  brand_id: string;
}

@injectable()
class CreatePurchaseService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    price,
    product_id,
    quantity,
    brand_id,
  }: IRequest): Promise<Purchase> {
    const purchase = await this.purchasesRepository.create({
      product_id,
      price,
      quantity,
      brand_id,
    });

    const productStock = await this.productsRepository.findProductStockById(
      product_id,
    );

    if (productStock) {
      const { stock } = productStock;

      await this.productsRepository.updateStock({
        id: stock.id,
        stock: Number(stock.stock) + Number(quantity),
      });
    }

    await this.cacheProvider.invalidatePrefix('products');
    await this.cacheProvider.invalidatePrefix('purchases');

    return purchase;
  }
}

export default CreatePurchaseService;
