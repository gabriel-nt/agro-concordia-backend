"use strict";

var _FakeProductsRepository = _interopRequireDefault(require("../../products/repositories/fakes/FakeProductsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakePurchasesRepository = _interopRequireDefault(require("../repositories/fakes/FakePurchasesRepository"));

var _CreatePurchaseService = _interopRequireDefault(require("./CreatePurchaseService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakePurchaseRepository;
let fakeProductsRepository;
let fakeCacheProvider;
let createPurchase;
describe('Create purchase service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakePurchaseRepository = new _FakePurchasesRepository.default();
    createPurchase = new _CreatePurchaseService.default(fakePurchaseRepository, fakeProductsRepository, fakeCacheProvider);
  });
  it('should be able to create a new purchase', async () => {
    const purchase = await createPurchase.execute({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1'
    });
    expect(purchase).toHaveProperty('id');
  });
});