import { v4 } from 'uuid';

import ICreateSalesDTO from '@modules/sales/dtos/ICreateSaleDTO';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import IListSaleDTO from '@modules/sales/dtos/IListSaleDTO';
import ISalesRepository from '../ISalesRepository';

class FakeSalesRepository implements ISalesRepository {
  private sales: Sale[] = [];

  public async index({ page, brand }: IListSaleDTO): Promise<Sale[]> {
    return this.sales;
  }

  public async findById(id: string): Promise<Sale | undefined> {
    const sale = this.sales.find(item => item.id === id);

    return sale;
  }

  public async create({
    price,
    product_id,
    quantity,
  }: ICreateSalesDTO): Promise<Sale> {
    const sale = new Sale();

    Object.assign(sale, {
      id: v4(),
      price,
      quantity,
      productId: product_id,
    });

    this.sales.push(sale);

    return sale;
  }

  public async save(sale: Sale): Promise<void> {
    await this.sales.push(sale);
  }

  public async destroy(id: string): Promise<void> {
    const findIndex = this.sales.findIndex(item => item.id === id);

    this.sales.splice(findIndex, 1);
  }
}

export default FakeSalesRepository;
