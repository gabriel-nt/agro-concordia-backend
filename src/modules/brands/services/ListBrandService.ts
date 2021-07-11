import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

@injectable()
class ListBrandService {
  constructor(
    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Brand[]> {
    let brands = await this.cacheProvider.recover<Brand[]>('brands');

    await this.cacheProvider.invalidate('brands');

    if (!brands) {
      brands = await this.brandsRepository.index();

      await this.cacheProvider.save('brands', classToClass(brands));
    }

    return brands;
  }
}

export default ListBrandService;
