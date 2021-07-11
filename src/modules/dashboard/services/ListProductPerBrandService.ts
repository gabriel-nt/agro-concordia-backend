import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IListProductPerBrandDTO from '../dtos/IListProductPerBrandDTO';
import IDashboardRepository from '../repositories/IDashboardRepository';

@injectable()
class ListProductPerBrandService {
  constructor(
    @inject('DashboardRepository')
    private dashboardRepository: IDashboardRepository,
  ) {}

  public async execute(): Promise<IListProductPerBrandDTO[]> {
    const { brands, products } = await this.dashboardRepository.index();

    const response = classToClass(brands).map(brand => {
      const data = products
        .filter(product => product.brandId === brand.id)
        .map(product => {
          const { stock } = product.productStock;

          return {
            id: product.id,
            title: product.title,
            nick: product.nick,
            stock: stock.stock,
          };
        });

      return {
        id: brand.id,
        stock:
          data.length > 0
            ? data.reduce((total, item) => total + (item ? item.stock : 0), 0)
            : 0,
        title: brand.brand,
        backgroundImage: brand.backgroundImage,
        data,
      };
    });

    return response;
  }
}

export default ListProductPerBrandService;
