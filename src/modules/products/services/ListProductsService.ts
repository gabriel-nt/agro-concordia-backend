import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProduct from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  brand: string;
  page: number;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ brand, page }: IRequest): Promise<IProduct[]> {
    let products = await this.cacheProvider.recover<IProduct[]>(
      `products-${brand}`,
    );

    if (!products) {
      products = await this.productsRepository.index({
        brand,
        page,
      });

      await this.cacheProvider.save(
        `products-${brand}`,
        classToClass(products),
      );
    }

    return products;
  }
}

export default ListProductsService;
