import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import { classToClass } from 'class-transformer';
import Purchase from '../infra/typeorm/entities/Purchase';
import IPurchasesRepository from '../repositories/IPurchasesRepository';

interface IRequest {
  page: number;
  brand: string;
}

@injectable()
class ListPurchasesService {
  constructor(
    @inject('PurchasesRepository')
    private purchasesRepository: IPurchasesRepository,

    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ brand, page }: IRequest): Promise<Purchase[]> {
    let purchases = await this.cacheProvider.recover<Purchase[]>(
      `purchases-${brand}`,
    );

    if (!purchases) {
      const brandId = await this.brandsRepository.findByName(brand);

      purchases = await this.purchasesRepository.index({
        page,
        brand: brandId && brandId.id,
      });

      await this.cacheProvider.save(
        `purchases-${brand}`,
        classToClass(purchases),
      );
    }

    return purchases;
  }
}

export default ListPurchasesService;
