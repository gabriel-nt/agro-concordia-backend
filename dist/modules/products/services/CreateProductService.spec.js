"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _CreateProductService = _interopRequireDefault(require("./CreateProductService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeProductsRepository;
let fakeCacheProvider;
let fakeStorageProvider;
let createProduct;
describe('Create product service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    createProduct = new _CreateProductService.default(fakeProductsRepository, fakeStorageProvider, fakeCacheProvider);
  });
  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      brandId: '10',
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      filePath: 'avengers',
      file: 'avengers.jpg'
    });
    expect(product).toHaveProperty('id');
  });
  it('should be able to create a product same name', async () => {
    await createProduct.execute({
      brandId: '10',
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      filePath: 'avengers',
      file: 'avengers.jpg'
    });
    await expect(createProduct.execute({
      brandId: '10',
      description: 'Vingadores Guerra Infinita',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 19.0,
      salePrice: 23.0,
      stock: 8,
      userId: '2',
      filePath: 'avengers',
      file: 'avengers-game-end.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});