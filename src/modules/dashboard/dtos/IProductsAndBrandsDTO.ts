import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import Product from '@modules/products/infra/typeorm/entities/Product';

export default interface IProductsAndBrandsDTO {
  products: Product[];
  brands: Brand[];
}
