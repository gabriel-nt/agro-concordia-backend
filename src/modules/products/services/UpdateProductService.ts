import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
  userId: string;
  title: string;
  nick: string;
  description: string;
  brandId: string;
  price: number;
  salePrice: number;
  stock: number;
  file?: string;
  filePath: string;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    userId,
    nick,
    title,
    description,
    brandId,
    stock,
    price,
    salePrice,
    file,
    filePath,
  }: IRequest): Promise<Product> {
    const findProduct = await this.productsRepository.findById(id);

    if (!findProduct) {
      throw new AppError(`The product ${id} don't exist`);
    }

    if (file) {
      if (findProduct.image) {
        await this.storageProvider.deleteFile(findProduct.image);
      }

      findProduct.image = await this.storageProvider.saveFile({
        file,
        filePath,
      });
    }

    const product = await this.productsRepository.update({
      id,
      userId,
      brandId,
      nick,
      title,
      description,
      stock,
      price,
      salePrice,
      image: findProduct.image,
    });

    await this.cacheProvider.invalidatePrefix('products');

    return product;
  }
}

export default UpdateProductService;
