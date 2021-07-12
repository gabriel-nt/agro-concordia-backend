import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Sale from '../infra/typeorm/entities/Sale';
import ISalesRepository from '../repositories/ISalesRepository';

interface IRequest {
  id: string;
  quantity: number;
  price: string;
}

@injectable()
class UpdateSaleService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id, quantity, price }: IRequest): Promise<Sale> {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new AppError(`Puchase with id ${id} not found`);
    }

    const oldQuantity = sale.quantity;

    Object.assign(sale, {
      price,
      quantity,
    });

    await this.salesRepository.save(sale);
    await this.cacheProvider.invalidate('sales');
    await this.cacheProvider.invalidate('products');

    const productStock = await this.productsRepository.findProductStockById(
      sale.productId,
    );

    if (productStock) {
      const { stock } = productStock;

      await this.productsRepository.updateStock({
        id: stock.id,
        stock: Number(stock.stock) + Number(oldQuantity) - Number(quantity),
      });
    }

    return sale;
  }
}

export default UpdateSaleService;
