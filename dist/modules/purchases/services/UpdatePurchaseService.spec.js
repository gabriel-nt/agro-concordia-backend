"use strict";

var _FakeProductsRepository = _interopRequireDefault(require("../../products/repositories/fakes/FakeProductsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakePurchasesRepository = _interopRequireDefault(require("../repositories/fakes/FakePurchasesRepository"));

var _UpdatePurchaseService = _interopRequireDefault(require("./UpdatePurchaseService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakePurchasesRepository;
let fakeProductsRepository;
let updatePurchase;
describe('Update purchase service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakePurchasesRepository = new _FakePurchasesRepository.default();
    updatePurchase = new _UpdatePurchaseService.default(fakePurchasesRepository, fakeProductsRepository, fakeCacheProvider);
  });
  it('should be able to update purchase', async () => {
    const purchase = await fakePurchasesRepository.create({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1'
    });
    const purchaseUpdated = await updatePurchase.execute({
      id: purchase.id,
      price: '20.8',
      quantity: 10
    });
    expect(purchaseUpdated.price).toEqual('20.8');
    expect(purchaseUpdated.quantity).toEqual(10);
  });
  it('should be able to update within non existing purchase', async () => {
    await expect(updatePurchase.execute({
      id: 'non-existing-purchase',
      price: '10',
      quantity: 10
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});