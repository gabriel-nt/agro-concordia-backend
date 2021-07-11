import { getRepository, Repository } from 'typeorm';

import ISalesRepository from '@modules/sales/repositories/ISalesRepository';
import ICreateSaleDTO from '@modules/sales/dtos/ICreateSaleDTO';
import IListSaleDTO from '@modules/sales/dtos/IListSaleDTO';
import Sale from '../entities/Sale';

class SalesRepository implements ISalesRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async index({ page, brand }: IListSaleDTO): Promise<Sale[]> {
    const sales = await this.ormRepository.find({
      relations: ['product', 'product.brand'],
      where: {
        brandId: brand,
      },
      take: Number(process.env.TYPEORM_SALES_LIMIT),
      skip: page === 1 ? 0 : page * Number(process.env.TYPEORM_SALES_LIMIT),
    });

    return sales;
  }

  public async findById(id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne(id, {
      relations: ['product'],
    });

    return sale;
  }

  public async create({
    quantity,
    product_id,
    price,
    brand_id,
  }: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create({
      price: Number(price),
      productId: product_id,
      brandId: brand_id,
      quantity,
    });

    await this.ormRepository.save(sale);

    return sale;
  }

  public async save(sale: Sale): Promise<void> {
    await this.ormRepository.save(sale);
  }

  public async destroy(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default SalesRepository;
