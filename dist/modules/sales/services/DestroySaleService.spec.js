"use strict";

var _FakeProductsRepository = _interopRequireDefault(require("../../products/repositories/fakes/FakeProductsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeSalesRepository = _interopRequireDefault(require("../repositories/fakes/FakeSalesRepository"));

var _DestroySaleService = _interopRequireDefault(require("./DestroySaleService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeSalesRepository;
let fakeProductsRepository;
let destroySale;
describe('Destroy sale service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakeSalesRepository = new _FakeSalesRepository.default();
    destroySale = new _DestroySaleService.default(fakeSalesRepository, fakeProductsRepository, fakeCacheProvider);
  });
  it('should be able to destroy sale', async () => {
    const purchase = await fakeSalesRepository.create({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1'
    });
    await destroySale.execute(purchase.id);
    const list = await fakeSalesRepository.index({
      page: 1
    });
    expect(list.length).toEqual(0);
  });
  it('should be able to destroy within non existing sale', async () => {
    await expect(destroySale.execute('non-existing-id')).rejects.toBeInstanceOf(_AppError.default);
  });
});