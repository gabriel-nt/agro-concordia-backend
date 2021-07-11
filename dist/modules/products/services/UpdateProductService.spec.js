"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _UpdateProductService = _interopRequireDefault(require("./UpdateProductService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeStorageProvider;
let fakeProductsRepository;
let updateProduct;
describe('Update product service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    updateProduct = new _UpdateProductService.default(fakeProductsRepository, fakeStorageProvider, fakeCacheProvider);
  });
  it('should be able to update product', async () => {
    const createProduct = await fakeProductsRepository.create({
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
    const product = await updateProduct.execute({
      brandId: '2',
      description: 'Vingadores Guerra Infinita',
      title: 'Avengers Infinity War',
      nick: 'Avengers',
      price: 15.0,
      salePrice: 22.0,
      stock: 2,
      userId: '1',
      id: createProduct.id,
      file: 'avengers.jpg',
      filePath: 'avengers'
    });
    expect(product.price).toEqual(15.0);
    expect(product.salePrice).toEqual(22.0);
    expect(product.title).toEqual('Avengers Infinity War');
  });
});