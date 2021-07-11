import { getRepository, Repository } from 'typeorm';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import Product from '@modules/products/infra/typeorm/entities/Product';
import Purchase from '@modules/purchases/infra/typeorm/entities/Purchase';
import IProductsAndBrandsDTO from '@modules/dashboard/dtos/IProductsAndBrandsDTO';
import IDashboardRepository from '@modules/dashboard/repositories/IDashboardRepository';
import IListSalesAndPurchasesLastWeekDTO from '@modules/dashboard/dtos/IListSalesAndPurchasesLastWeekDTO';

class DashboardRepository implements IDashboardRepository {
  private ormRepositoryProduct: Repository<Product>;

  private ormRepositoryBrand: Repository<Brand>;

  private ormRepositorySale: Repository<Sale>;

  constructor() {
    this.ormRepositorySale = getRepository(Sale);
    this.ormRepositoryBrand = getRepository(Brand);
    this.ormRepositoryProduct = getRepository(Product);
  }

  public async index(): Promise<IProductsAndBrandsDTO> {
    const products = await this.ormRepositoryProduct.find({
      select: ['id', 'title', 'nick', 'brandId', 'productStock'],
      relations: ['productStock', 'productStock.stock'],
    });

    const brands = await this.ormRepositoryBrand.find();

    return {
      brands,
      products,
    };
  }

  public async findByLastWeek(): Promise<IListSalesAndPurchasesLastWeekDTO> {
    const salesLength = await getRepository(Sale)
      .createQueryBuilder('sales')
      .select(`date_trunc('day', created_at)`, 'day')
      .addSelect('SUM(quantity)', 'total')
      .orderBy('day', 'ASC')
      .groupBy('1')
      .getRawMany();

    const salesSum = await getRepository(Sale)
      .createQueryBuilder('sales')
      .select(`date_trunc('day', created_at)`, 'day')
      .addSelect('SUM(price)', 'total')
      .addSelect('SUM(quantity)', 'total')
      .orderBy('day', 'ASC')
      .groupBy('1')
      .getRawMany();

    const purchasesLength = await getRepository(Purchase)
      .createQueryBuilder('purchases')
      .select(`date_trunc('day', created_at)`, 'day')
      .addSelect('SUM(quantity)', 'total')
      .orderBy('day', 'ASC')
      .groupBy('1')
      .getRawMany();

    const purchasesSum = await getRepository(Purchase)
      .createQueryBuilder('purchases')
      .select(`date_trunc('day', created_at)`, 'day')
      .addSelect('SUM(price)', 'price')
      .addSelect('SUM(quantity)', 'quantity')
      .orderBy('day', 'ASC')
      .groupBy('1')
      .getRawMany();

    return {
      sales: {
        count: salesLength,
        total: salesSum.map(item => ({
          day: item.day,
          total: Number(item.price) * Number(item.quantity),
        })),
      },
      purchases: {
        count: purchasesLength,
        total: purchasesSum.map(item => ({
          day: item.day,
          total: Number(item.price) * Number(item.quantity),
        })),
      },
    };
  }
}

export default DashboardRepository;
