import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import Brand from '../infra/typeorm/entities/Brand';
import IBrandsRepository from '../repositories/IBrandsRepository';

interface IRequest {
  brand: string;
  image: string;
  filePath: string;
  backgroundImage: string;
}

@injectable()
class CreateBrandService {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    brand,
    image,
    backgroundImage,
    filePath,
  }: IRequest): Promise<Brand> {
    const newBrand = await this.brandsRepository.create({
      brand,
      image: `${filePath}/${image}`,
      backgroundImage: `${filePath}/${backgroundImage}`,
    });

    await this.storageProvider.saveFile({
      file: backgroundImage,
      filePath,
    });

    await this.storageProvider.saveFile({ file: image, filePath });
    await this.cacheProvider.invalidate('brands');

    return newBrand;
  }
}

export default CreateBrandService;
