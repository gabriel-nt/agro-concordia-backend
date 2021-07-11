import { getRepository, Repository } from 'typeorm';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';
import IUpdateStockDTO from '@modules/products/dtos/IUpdateStockDTO';
import IListProductDTO from '@modules/products/dtos/IListProductDTO';
import Product from '../entities/Product';
import Stock from '../entities/Stock';
import ProductStock from '../entities/ProductStock';

class ProductRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  private ormRepositoryStock: Repository<Stock>;

  private ormRepositoryProductStock: Repository<ProductStock>;

  constructor() {
    this.ormRepository = getRepository(Product);
    this.ormRepositoryStock = getRepository(Stock);
    this.ormRepositoryProductStock = getRepository(ProductStock);
  }

  public async index({ page, brand }: IListProductDTO): Promise<Product[]> {
    const products = await this.ormRepository.find({
      relations: ['brand', 'productStock', 'productStock.stock'],
      where:
        brand !== 'undefined'
          ? {
              brandId: brand,
            }
          : {},
      take: Number(process.env.TYPEORM_PRODUCTS_LIMIT),
      skip: page === 1 ? 0 : page * Number(process.env.TYPEORM_PRODUCTS_LIMIT),
    });

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        title: name,
      },
    });

    return product;
  }

  public async findByBrand(id: string): Promise<Product[]> {
    const product = await this.ormRepository.find({
      where: {
        brandId: id,
      },
    });

    return product;
  }

  public async findStockById(id: string): Promise<Stock | undefined> {
    const stock = await this.ormRepositoryStock.findOne(id);

    return stock;
  }

  public async findProductStockById(
    id: string,
  ): Promise<ProductStock | undefined> {
    const productStock = await this.ormRepositoryProductStock.findOne({
      where: {
        productId: id,
      },
      relations: ['stock'],
    });

    return productStock;
  }

  public async create({
    description,
    brandId,
    nick,
    price,
    title,
    salePrice,
    stock,
    userId,
    image,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      title,
      description,
      nick,
      price,
      salePrice,
      brandId,
      userId,
      image,
    });

    await this.ormRepository.save(product);

    const stocks = this.ormRepositoryStock.create({
      stock,
    });

    await this.ormRepositoryStock.save(stocks);

    const productStock = this.ormRepositoryProductStock.create({
      stockId: stocks.id,
      productId: product.id,
    });

    await this.ormRepositoryProductStock.save(productStock);

    return product;
  }

  public async update({
    id,
    description,
    brandId,
    nick,
    price,
    title,
    salePrice,
    stock,
    userId,
  }: IUpdateProductDTO): Promise<Product> {
    await this.ormRepository.update(id, {
      title,
      description,
      nick,
      price,
      salePrice,
      brandId,
      userId,
    });

    const product = await this.ormRepository.findOne(id, {
      relations: ['brand', 'productStock', 'productStock.stock'],
    });

    if (!product) {
      throw new AppError('Not found product');
    }

    await this.ormRepository.save(product);

    const productStock = await this.ormRepositoryProductStock.findOne({
      where: {
        productId: id,
      },
    });

    if (productStock) {
      const stocks = await this.ormRepositoryStock.findOne(
        productStock.stockId,
      );

      if (stocks) {
        stocks.stock = stock;
        await this.ormRepositoryStock.save(stocks);
      }
    }

    return product;
  }

  public async updateStock({
    id,
    stock,
  }: IUpdateStockDTO): Promise<Stock | undefined> {
    await this.ormRepositoryStock.update(id, {
      stock,
    });

    const findStock = await this.ormRepositoryStock.findOne(id);

    return findStock;
  }

  public async destroy(id: string): Promise<void> {
    await this.ormRepository.update(id, {
      trash: 1,
    });

    const product = await this.ormRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    await this.ormRepository.save(product);
  }
}

export default ProductRepository;
