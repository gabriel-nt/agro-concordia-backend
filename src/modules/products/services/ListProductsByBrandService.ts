import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import { inject, injectable } from 'tsyringe';
import IProduct from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class ListProductsByBrandService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,
  ) {}

  public async execute(brand: string): Promise<IProduct[]> {
    const findBrand = await this.brandsRepository.findByName(brand);

    if (findBrand) {
      const { id } = findBrand;

      const products = await this.productsRepository.findByBrand(id);

      return products;
    }

    return [];
  }
}

export default ListProductsByBrandService;
