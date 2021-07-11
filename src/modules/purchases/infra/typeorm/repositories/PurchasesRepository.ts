import { getRepository, Repository } from 'typeorm';

import ICreatePurchaseDTO from '@modules/purchases/dtos/ICreatePurchaseDTO';
import IPurchasesRepository from '@modules/purchases/repositories/IPurchasesRepository';
import IListPurchaseDTO from '@modules/purchases/dtos/IListPurchaseDTO';
import Purchase from '../entities/Purchase';

class PurchasesRepository implements IPurchasesRepository {
  private ormRepository: Repository<Purchase>;

  constructor() {
    this.ormRepository = getRepository(Purchase);
  }

  public async index({ page, brand }: IListPurchaseDTO): Promise<Purchase[]> {
    const purchases = await this.ormRepository.find({
      relations: ['product', 'product.brand'],
      where: {
        brandId: brand,
      },
      take: Number(process.env.TYPEORM_SALES_LIMIT),
      skip: page === 1 ? 0 : page * Number(process.env.TYPEORM_SALES_LIMIT),
    });

    return purchases;
  }

  public async findById(id: string): Promise<Purchase | undefined> {
    const purchase = await this.ormRepository.findOne(id, {
      relations: ['product'],
    });

    return purchase;
  }

  public async create({
    quantity,
    product_id,
    price,
    brand_id,
  }: ICreatePurchaseDTO): Promise<Purchase> {
    const purchase = this.ormRepository.create({
      price: Number(price),
      productId: product_id,
      brandId: brand_id,
      quantity,
    });

    await this.ormRepository.save(purchase);

    return purchase;
  }

  public async save(purchase: Purchase): Promise<void> {
    await this.ormRepository.save(purchase);
  }

  public async destroy(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PurchasesRepository;
