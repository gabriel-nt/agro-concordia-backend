import FakeDashboardRepository from '../repositories/fakes/FakeDashboardRepository';
import ListSalesAndPurchasesLastWeekService from './ListSalesAndPurchasesLastWeekService';

let fakeDashboardRepository: FakeDashboardRepository;
let listSalesAndPurchases: ListSalesAndPurchasesLastWeekService;

describe('List sales and purchases in last week', () => {
  beforeEach(() => {
    fakeDashboardRepository = new FakeDashboardRepository();

    listSalesAndPurchases = new ListSalesAndPurchasesLastWeekService(
      fakeDashboardRepository,
    );
  });

  it('should be able to list sales and purchases in last week', async () => {
    const response = await listSalesAndPurchases.execute();

    expect(response).toHaveProperty('sales');
    expect(response).toHaveProperty('purchases');
  });
});
