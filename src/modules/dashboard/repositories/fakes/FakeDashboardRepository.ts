import IDashboardRepository from '@modules/dashboard/repositories/IDashboardRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import IProductsAndBrandsDTO from '@modules/dashboard/dtos/IProductsAndBrandsDTO';
import { v4 } from 'uuid';
import IListSalesAndPurchasesLastWeekDTO from '@modules/dashboard/dtos/IListSalesAndPurchasesLastWeekDTO';

class FakeDashboardRepository implements IDashboardRepository {
  private brands: Brand[] = [];

  private products: Product[] = [];

  constructor() {
    const brand = new Brand();
    const product = new Product();

    Object.assign(brand, {
      id: v4(),
      brand: 'Brand',
    });

    Object.assign(product, {
      id: v4(),
      description: 'Teste',
      brandId: 1,
      nick: 'Teste',
      price: 10.0,
      title: 'Title',
      salePrice: 10.0,
      userId: '1',
    });

    this.brands.push(brand);
    this.products.push(product);
  }

  public async index(): Promise<IProductsAndBrandsDTO> {
    return {
      brands: this.brands,
      products: this.products,
    };
  }

  public async findByLastWeek(): Promise<IListSalesAndPurchasesLastWeekDTO> {
    return {
      sales: {
        count: [{ day: '2020-02-10', total: 2 }],
        total: [{ day: '2020-02-10', total: 2 }],
      },
      purchases: {
        count: [{ day: '2020-02-10', total: 2 }],
        total: [{ day: '2020-02-10', total: 2 }],
      },
    };
  }
}

export default FakeDashboardRepository;
