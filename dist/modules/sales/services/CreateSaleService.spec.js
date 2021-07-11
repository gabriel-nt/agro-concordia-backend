"use strict";

var _FakeProductsRepository = _interopRequireDefault(require("../../products/repositories/fakes/FakeProductsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeSalesRepository = _interopRequireDefault(require("../repositories/fakes/FakeSalesRepository"));

var _CreateSaleService = _interopRequireDefault(require("./CreateSaleService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeSaleRepository;
let fakeProductsRepository;
let createSale;
describe('Create purchase service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakeSaleRepository = new _FakeSalesRepository.default();
    createSale = new _CreateSaleService.default(fakeSaleRepository, fakeProductsRepository, fakeCacheProvider);
  });
  it('should be able to create a new purchase', async () => {
    const sale = await createSale.execute({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1'
    });
    expect(sale).toHaveProperty('id');
  });
});