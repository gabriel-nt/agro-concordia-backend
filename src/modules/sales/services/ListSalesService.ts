import IBrandsRepository from '@modules/brands/repositories/IBrandsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import Sale from '../infra/typeorm/entities/Sale';
import ISalesRepository from '../repositories/ISalesRepository';

interface IRequest {
  page: number;
  brand: string;
}

@injectable()
class ListSalesService {
  constructor(
    @inject('SalesRepository')
    private salesRepository: ISalesRepository,

    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ brand, page }: IRequest): Promise<Sale[]> {
    let sales = await this.cacheProvider.recover<Sale[]>(`sales-${brand}`);

    if (!sales) {
      const brandId = await this.brandsRepository.findByName(brand);

      sales = await this.salesRepository.index({
        page,
        brand: brandId && brandId.id,
      });

      await this.cacheProvider.save('sales', sales);
    }

    return sales;
  }
}

export default ListSalesService;
