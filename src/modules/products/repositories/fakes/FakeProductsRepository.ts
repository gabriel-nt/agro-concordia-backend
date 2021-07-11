import { v4 } from 'uuid';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateStockDTO from '@modules/products/dtos/IUpdateStockDTO';
import IUpdateProductDTO from '@modules/products/dtos/IUpdateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ProductStock from '@modules/products/infra/typeorm/entities/ProductStock';
import Stock from '@modules/products/infra/typeorm/entities/Stock';
import AppError from '@shared/errors/AppError';
import IListProductDTO from '@modules/products/dtos/IListProductDTO';
import IProductsRepository from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  private stocks: Stock[] = [];

  private productStock: ProductStock[] = [];

  public async index({ brand, page }: IListProductDTO): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(item => item.id === id);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.products.find(item => item.title === name);

    return product;
  }

  public async findStockById(id: string): Promise<Stock | undefined> {
    const stock = this.stocks.find(item => item.id === id);

    return stock;
  }

  public async findByBrand(id: string): Promise<Product[]> {
    const products = this.products.filter(item => item.brandId === id);

    return products;
  }

  public async findProductStockById(
    id: string,
  ): Promise<ProductStock | undefined> {
    const productStock = this.productStock.find(item => item.id === id);

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
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: v4(),
      description,
      brandId,
      nick,
      price,
      title,
      salePrice,
      userId,
    });

    this.products.push(product);

    const stocks = new Stock();

    Object.assign(stocks, {
      id: v4(),
      stock,
    });

    this.stocks.push(stocks);

    const productStock = new ProductStock();

    Object.assign(productStock, {
      id: v4(),
      productId: product.id,
      stockId: stocks.id,
    });

    this.productStock.push(productStock);

    return product;
  }

  public async updateStock({
    id,
    stock,
  }: IUpdateStockDTO): Promise<Stock | undefined> {
    const findIndex = this.stocks.findIndex(item => item.id === id);

    this.stocks[findIndex].stock = stock;

    return this.stocks[findIndex];
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
    const findIndex = this.products.findIndex(item => item.id === id);
    const findProduct = this.products.find(item => item.id === id);

    if (!findProduct) {
      throw new AppError('Product not found');
    }

    Object.assign(findProduct, {
      description,
      brandId,
      nick,
      price,
      title,
      salePrice,
      stock,
      userId,
    });

    this.products[findIndex] = findProduct;

    const findProductStock = this.productStock.find(
      item => item.productId === id,
    );

    if (findProductStock) {
      const findStock = this.stocks.find(
        item => item.id === findProductStock.stockId,
      );
      const findIndexStock = this.stocks.findIndex(
        item => item.id === findProductStock.stockId,
      );

      if (findStock) {
        findStock.stock = stock;
        this.stocks[findIndexStock] = findStock;
      }
    }

    return findProduct;
  }

  public async destroy(id: string): Promise<void> {
    const findIndex = this.products.findIndex(item => item.id === id);

    this.products[findIndex].trash = 1;
  }
}

export default FakeProductsRepository;
