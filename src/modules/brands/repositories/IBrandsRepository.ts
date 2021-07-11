import ICreateBrandDTO from '../dtos/ICreateBrandDTO';
import Brand from '../infra/typeorm/entities/Brand';

export default interface IBrandsRepository {
  index(): Promise<Brand[]>;
  create(data: ICreateBrandDTO): Promise<Brand>;
  findById(id: string): Promise<Brand | undefined>;
  findByName(brand: string): Promise<Brand | undefined>;
  save(brand: Brand): Promise<void>;
  destroy(id: string): Promise<void>;
}
