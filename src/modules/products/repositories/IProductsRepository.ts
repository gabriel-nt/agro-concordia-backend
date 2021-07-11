import Product from '../infra/typeorm/entities/Product';
import Stock from '../infra/typeorm/entities/Stock';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';
import IUpdateStockDTO from '../dtos/IUpdateStockDTO';
import ProductStock from '../infra/typeorm/entities/ProductStock';
import IListProductDTO from '../dtos/IListProductDTO';

export default interface IProductsRepository {
  index(data: IListProductDTO): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findStockById(id: string): Promise<Stock | undefined>;
  findProductStockById(id: string): Promise<ProductStock | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  update(data: IUpdateProductDTO): Promise<Product>;
  findByBrand(string: string): Promise<Product[]>;
  updateStock(data: IUpdateStockDTO): Promise<Stock | undefined>;
  destroy(id: string): Promise<void>;
}
