import { getRepository, Repository } from 'typeorm';

import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import ICreateBrandDTO from '@modules/brands/dtos/ICreateBrandDTO';
import Brand from '../entities/Brand';

class BrandsRepository implements IBrandsRepository {
  private ormRepository: Repository<Brand>;

  constructor() {
    this.ormRepository = getRepository(Brand);
  }

  public async index(): Promise<Brand[]> {
    const brands = await this.ormRepository.find();

    return brands;
  }

  public async findById(id: string): Promise<Brand | undefined> {
    const brand = this.ormRepository.findOne(id);

    return brand;
  }

  public async findByName(name: string): Promise<Brand | undefined> {
    const brand = this.ormRepository.findOne({
      where: {
        brand: name,
      },
    });

    return brand;
  }

  public async create({
    brand,
    backgroundImage,
    image,
  }: ICreateBrandDTO): Promise<Brand> {
    const newBrand = this.ormRepository.create({
      brand,
      image,
      backgroundImage,
    });

    await this.ormRepository.save(newBrand);

    return newBrand;
  }

  public async destroy(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async save(brand: Brand): Promise<void> {
    await this.ormRepository.save(brand);
  }
}

export default BrandsRepository;
