"use strict";

var _FakeProductsRepository = _interopRequireDefault(require("../../products/repositories/fakes/FakeProductsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePurchasesRepository = _interopRequireDefault(require("../repositories/fakes/FakePurchasesRepository"));

var _DestroyPurchaseService = _interopRequireDefault(require("./DestroyPurchaseService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeProductsRepository;
let fakePurchasesRepository;
let destroyPurchase;
describe('Destroy purchase service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakePurchasesRepository = new _FakePurchasesRepository.default();
    destroyPurchase = new _DestroyPurchaseService.default(fakePurchasesRepository, fakeProductsRepository, fakeCacheProvider);
  });
  it('should be able to destroy purchase', async () => {
    const purchase = await fakePurchasesRepository.create({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1'
    });
    const isDestroy = await destroyPurchase.execute(purchase.id);
    expect(isDestroy).toBeTruthy();
  });
  it('should be able to destroy within non existing purchase', async () => {
    await expect(destroyPurchase.execute('non-existing-id')).rejects.toBeInstanceOf(_AppError.default);
  });
});