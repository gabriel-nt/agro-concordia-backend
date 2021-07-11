import { v4 } from 'uuid';

import ICreatePurchaseDTO from '@modules/purchases/dtos/ICreatePurchaseDTO';
import Purchase from '@modules/purchases/infra/typeorm/entities/Purchase';
import IListPurchaseDTO from '@modules/purchases/dtos/IListPurchaseDTO';
import IPurchasesRepository from '../IPurchasesRepository';

class FakePurchasesRepository implements IPurchasesRepository {
  private purchases: Purchase[] = [];

  public async index({ page, brand }: IListPurchaseDTO): Promise<Purchase[]> {
    return this.purchases;
  }

  public async findById(id: string): Promise<Purchase | undefined> {
    const purchase = this.purchases.find(item => item.id === id);

    return purchase;
  }

  public async create({
    price,
    product_id,
    quantity,
  }: ICreatePurchaseDTO): Promise<Purchase> {
    const purchase = new Purchase();

    Object.assign(purchase, {
      id: v4(),
      price,
      quantity,
      productId: product_id,
    });

    this.purchases.push(purchase);

    return purchase;
  }

  public async save(purchase: Purchase): Promise<void> {
    this.purchases.push(purchase);
  }

  public async destroy(id: string): Promise<void> {
    const findIndex = this.purchases.findIndex(item => item.id === id);

    this.purchases.splice(findIndex, 1);
  }
}

export default FakePurchasesRepository;
