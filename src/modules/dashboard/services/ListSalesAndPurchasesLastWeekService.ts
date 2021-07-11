import { inject, injectable } from 'tsyringe';
import IListSalesAndPurchasesLastWeekDTO from '../dtos/IListSalesAndPurchasesLastWeekDTO';

import IDashboardRepository from '../repositories/IDashboardRepository';

@injectable()
class ListSalesAndPurchasesLastWeekService {
  constructor(
    @inject('DashboardRepository')
    private dashboardRepository: IDashboardRepository,
  ) {}

  public async execute(): Promise<IListSalesAndPurchasesLastWeekDTO> {
    const response = await this.dashboardRepository.findByLastWeek();

    return response;
  }
}

export default ListSalesAndPurchasesLastWeekService;
