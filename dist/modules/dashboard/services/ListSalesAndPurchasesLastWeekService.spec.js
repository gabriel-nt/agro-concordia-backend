"use strict";

var _FakeDashboardRepository = _interopRequireDefault(require("../repositories/fakes/FakeDashboardRepository"));

var _ListSalesAndPurchasesLastWeekService = _interopRequireDefault(require("./ListSalesAndPurchasesLastWeekService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDashboardRepository;
let listSalesAndPurchases;
describe('List sales and purchases in last week', () => {
  beforeEach(() => {
    fakeDashboardRepository = new _FakeDashboardRepository.default();
    listSalesAndPurchases = new _ListSalesAndPurchasesLastWeekService.default(fakeDashboardRepository);
  });
  it('should be able to list sales and purchases in last week', async () => {
    const response = await listSalesAndPurchases.execute();
    expect(response).toHaveProperty('sales');
    expect(response).toHaveProperty('purchases');
  });
});