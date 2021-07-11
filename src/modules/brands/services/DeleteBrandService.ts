import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import IBrandsRepository from '../repositories/IBrandsRepository';

@injectable()
class DeleteBrandService {
  constructor(
    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<boolean> {
    const findBrand = await this.brandsRepository.findById(id);

    if (!findBrand) {
      throw new AppError('Brand not existing');
    }

    if (findBrand.image) {
      await this.storageProvider.deleteFile(findBrand.image);
    }

    if (findBrand.backgroundImage) {
      await this.storageProvider.deleteFile(findBrand.backgroundImage);
    }

    await this.brandsRepository.destroy(findBrand.id);
    await this.cacheProvider.invalidate('brands');

    return true;
  }
}

export default DeleteBrandService;
