import ICreatePurchaseDTO from '../dtos/ICreatePurchaseDTO';
import IListPurchaseDTO from '../dtos/IListPurchaseDTO';
import Purchase from '../infra/typeorm/entities/Purchase';

export default interface IPurchasesRepository {
  index(data: IListPurchaseDTO): Promise<Purchase[]>;
  findById(id: string): Promise<Purchase | undefined>;
  create(data: ICreatePurchaseDTO): Promise<Purchase>;
  destroy(id: string): Promise<void>;
  save(purchase: Purchase): Promise<void>;
}
