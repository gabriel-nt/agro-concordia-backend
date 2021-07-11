"use strict";

var _FakeBrandsRepository = _interopRequireDefault(require("../../brands/repositories/fakes/FakeBrandsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeSalesRepository = _interopRequireDefault(require("../repositories/fakes/FakeSalesRepository"));

var _ListSalesService = _interopRequireDefault(require("./ListSalesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeSalesRepository;
let fakeBrandsRepository;
let listSales;
describe('List sales service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeSalesRepository = new _FakeSalesRepository.default();
    fakeBrandsRepository = new _FakeBrandsRepository.default();
    listSales = new _ListSalesService.default(fakeSalesRepository, fakeBrandsRepository, fakeCacheProvider);
  });
  it('should be able to list sales', async () => {
    await fakeSalesRepository.create({
      price: '20.9',
      quantity: 10,
      product_id: '1',
      brand_id: '1'
    });
    const sales = await listSales.execute({
      page: 1,
      brand: '1'
    });
    expect(sales).toHaveLength(1);
  });
});