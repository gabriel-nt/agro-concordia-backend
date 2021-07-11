import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<boolean | undefined> {
    const findProduct = await this.productsRepository.findById(id);

    if (!findProduct) {
      throw new AppError('Product not found');
    }

    await this.productsRepository.destroy(id);
    await this.cacheProvider.invalidatePrefix('products');

    return true;
  }
}

export default DeleteProductService;
