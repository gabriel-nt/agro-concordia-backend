"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _DeleteProductService = _interopRequireDefault(require("./DeleteProductService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeProductsRepository;
let deleteProduct;
describe('Delete product service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    deleteProduct = new _DeleteProductService.default(fakeProductsRepository, fakeCacheProvider);
  });
  it('should be able to delete product', async () => {
    const product = await fakeProductsRepository.create({
      brandId: '10',
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      image: 'avengers.jpg'
    });
    await deleteProduct.execute(product.id);
    const list = await fakeProductsRepository.index({
      brand: '10',
      page: 1
    });
    expect(list.length).toEqual(0);
  });
  it('should be able to create within non existing product', async () => {
    await expect(deleteProduct.execute('non-existing-id')).rejects.toBeInstanceOf(_AppError.default);
  });
});