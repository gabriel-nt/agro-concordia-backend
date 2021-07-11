import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

interface IRequest {
  id: string;
  brand: string;
  image?: string;
  filePath: string;
  backgroundImage?: string;
}

@injectable()
class UpdateBrandService {
  constructor(
    @inject('BrandsRepository') private brandsRepository: IBrandsRepository,
    @inject('StorageProvider') private storageProvider: IStorageProvider,
    @inject('CacheProvider') private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    brand,
    id,
    image,
    backgroundImage,
    filePath,
  }: IRequest): Promise<Brand> {
    const findBrand = await this.brandsRepository.findById(id);

    if (!findBrand) {
      throw new AppError('Brand not existing');
    }

    if (image) {
      if (findBrand.image) {
        await this.storageProvider.deleteFile(findBrand.image);
      }

      findBrand.image = await this.storageProvider.saveFile({
        filePath,
        file: image,
      });
    }

    if (backgroundImage) {
      if (findBrand.backgroundImage) {
        await this.storageProvider.deleteFile(findBrand.backgroundImage);
      }

      findBrand.backgroundImage = await this.storageProvider.saveFile({
        filePath,
        file: backgroundImage,
      });
    }

    Object.assign(findBrand, {
      brand,
    });

    await this.brandsRepository.save(findBrand);
    await this.cacheProvider.invalidate('brands');

    return findBrand;
  }
}

export default UpdateBrandService;
