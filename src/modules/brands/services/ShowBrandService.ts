import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

@injectable()
class ShowBrandService {
  constructor(
    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,
  ) {}

  public async execute(id: string): Promise<Brand> {
    const findBrand = await this.brandsRepository.findById(id);

    if (!findBrand) {
      throw new AppError('Brand not found');
    }

    return findBrand;
  }
}

export default ShowBrandService;
