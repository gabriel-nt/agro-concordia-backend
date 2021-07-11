import IListSalesAndPurchasesLastWeekDTO from '../dtos/IListSalesAndPurchasesLastWeekDTO';
import IProductsAndBrandsDTO from '../dtos/IProductsAndBrandsDTO';

export default interface IDashboardRepository {
  index(): Promise<IProductsAndBrandsDTO>;
  findByLastWeek(): Promise<IListSalesAndPurchasesLastWeekDTO>;
}
