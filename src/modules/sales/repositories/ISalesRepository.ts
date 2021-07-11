import ICreateSaleDTO from '../dtos/ICreateSaleDTO';
import IListSaleDTO from '../dtos/IListSaleDTO';
import Sale from '../infra/typeorm/entities/Sale';

export default interface ISalesRepository {
  index(data: IListSaleDTO): Promise<Sale[]>;
  findById(id: string): Promise<Sale | undefined>;
  save(sale: Sale): Promise<void>;
  create(data: ICreateSaleDTO): Promise<Sale>;
  destroy(id: string): Promise<void>;
}
