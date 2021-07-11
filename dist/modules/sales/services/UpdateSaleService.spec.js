"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeProductsRepository = _interopRequireDefault(require("../../products/repositories/fakes/FakeProductsRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeSalesRepository = _interopRequireDefault(require("../repositories/fakes/FakeSalesRepository"));

var _UpdateSaleService = _interopRequireDefault(require("./UpdateSaleService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeSalesRepository;
let fakeProductsRepository;
let updateSale;
describe('Update sale service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    fakeSalesRepository = new _FakeSalesRepository.default();
    updateSale = new _UpdateSaleService.default(fakeSalesRepository, fakeProductsRepository, fakeCacheProvider);
  });
  it('should be able to update sale', async () => {
    const sale = await fakeSalesRepository.create({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1'
    });
    const saleUpdated = await updateSale.execute({
      id: sale.id,
      price: '20.8',
      quantity: 10
    });
    expect(saleUpdated.price).toEqual('20.8');
    expect(saleUpdated.quantity).toEqual(10);
  });
  it('should be able to update within non existing sale', async () => {
    await expect(updateSale.execute({
      id: 'non-existing-sale',
      price: '10',
      quantity: 10
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});