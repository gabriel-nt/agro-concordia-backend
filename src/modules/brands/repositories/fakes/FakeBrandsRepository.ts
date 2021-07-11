import { v4 } from 'uuid';

import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import ICreateBrandDTO from '@modules/brands/dtos/ICreateBrandDTO';
import IBrandsRepository from '../IBrandsRepository';

class FakeBrandsRepository implements IBrandsRepository {
  private brands: Brand[] = [];

  public async index(): Promise<Brand[]> {
    return this.brands;
  }

  public async create({
    brand,
    image,
    backgroundImage,
  }: ICreateBrandDTO): Promise<Brand> {
    const createdBrand = new Brand();

    Object.assign(createdBrand, {
      id: v4(),
      brand,
      image,
      backgroundImage,
    });

    this.brands.push(createdBrand);

    return createdBrand;
  }

  public async findById(id: string): Promise<Brand | undefined> {
    const brand = this.brands.find(findBrand => findBrand.id === id);

    return brand;
  }

  public async findByName(name: string): Promise<Brand | undefined> {
    const brand = this.brands.find(
      findBrand =>
        name.toLocaleLowerCase() === findBrand.brand.toLocaleLowerCase(),
    );

    return brand;
  }

  public async save(brand: Brand): Promise<void> {
    this.brands.push(brand);
  }

  public async destroy(id: string): Promise<void> {
    const findIndex = this.brands.findIndex(item => item.id === id);

    this.brands.splice(findIndex, 1);
  }
}

export default FakeBrandsRepository;
