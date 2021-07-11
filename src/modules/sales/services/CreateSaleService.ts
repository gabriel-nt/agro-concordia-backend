import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Sale from '../infra/typeorm/entities/Sale';
import ISalesRepository from '../repositories/ISalesRepository';

interface IRequest {
  product_id: string;
  quantity: number;
  price: string;
  brand_id: string;
}

@injectable()
class CreateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

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
  }: IRequest): Promise<Sale> {
    const productStock = await this.productsRepository.findProductStockById(
      product_id,
    );

    if (!productStock) {
      throw new AppError('Stock not found');
    }

    const { stock } = productStock;

    if (stock.stock === 0) {
      throw new AppError('Zero stock');
    }

    await this.productsRepository.updateStock({
      id: stock.id,
      stock: Number(stock.stock) - Number(quantity),
    });

    const sale = await this.salesRepository.create({
      product_id,
      price,
      quantity,
      brand_id,
    });

    await this.cacheProvider.invalidate('sales');
    await this.cacheProvider.invalidate('products');

    return sale;
  }
}

export default CreateSaleService;
