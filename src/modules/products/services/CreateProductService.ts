import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  title: string;
  nick: string;
  description: string;
  brandId: string;
  price: number;
  salePrice: number;
  stock: number;
  userId: string;
  file: string;
  filePath: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    nick,
    title,
    stock,
    price,
    salePrice,
    brandId,
    description,
    userId,
    file,
    filePath,
  }: IRequest): Promise<Product> {
    const findProductInSameName = await this.productsRepository.findByName(
      title,
    );

    if (findProductInSameName) {
      throw new AppError('This product is already booked');
    }

    const product = await this.productsRepository.create({
      brandId,
      description,
      nick,
      price,
      salePrice,
      stock,
      title,
      userId,
      image: `${filePath}/${file}`,
    });

    await this.storageProvider.saveFile({ file, filePath });
    await this.cacheProvider.invalidatePrefix('products');

    return product;
  }
}

export default CreateProductService;
