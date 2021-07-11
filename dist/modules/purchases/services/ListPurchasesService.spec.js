"use strict";

var _FakeBrandsRepository = _interopRequireDefault(require("../../brands/repositories/fakes/FakeBrandsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakePurchasesRepository = _interopRequireDefault(require("../repositories/fakes/FakePurchasesRepository"));

var _ListPurchasesService = _interopRequireDefault(require("./ListPurchasesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeBrandsRepository;
let fakePurchasesRepository;
let listPurchases;
describe('List purchases service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeBrandsRepository = new _FakeBrandsRepository.default();
    fakePurchasesRepository = new _FakePurchasesRepository.default();
    listPurchases = new _ListPurchasesService.default(fakePurchasesRepository, fakeBrandsRepository, fakeCacheProvider);
  });
  it('should be able to list purchases', async () => {
    await fakePurchasesRepository.create({
      price: '20.9',
      quantity: 10,
      product_id: '1',
      brand_id: '1'
    });
    const purchases = await listPurchases.execute({
      brand: '1',
      page: 1
    });
    expect(purchases).toHaveLength(1);
  });
});