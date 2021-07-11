"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _ListProductsService = _interopRequireDefault(require("./ListProductsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeProductsRepository;
let listProducts;
describe('List products service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    listProducts = new _ListProductsService.default(fakeProductsRepository, fakeCacheProvider);
  });
  it('should be able to list products', async () => {
    await fakeProductsRepository.create({
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
    const products = await listProducts.execute({
      page: 1,
      brand: '10'
    });
    expect(products).toHaveLength(1);
  });
});