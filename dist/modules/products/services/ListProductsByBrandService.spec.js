"use strict";

var _FakeBrandsRepository = _interopRequireDefault(require("../../brands/repositories/fakes/FakeBrandsRepository"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _ListProductsByBrandService = _interopRequireDefault(require("./ListProductsByBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeBrandsRepository;
let fakeProductsRepository;
let listProducts;
describe('List products by brand service', () => {
  beforeEach(() => {
    fakeBrandsRepository = new _FakeBrandsRepository.default();
    fakeProductsRepository = new _FakeProductsRepository.default();
    listProducts = new _ListProductsByBrandService.default(fakeProductsRepository, fakeBrandsRepository);
  });
  it('should be able to list products by brand', async () => {
    const brand = await fakeBrandsRepository.create({
      brand: 'Marvel',
      image: 'marvel.jpg',
      backgroundImage: 'background.jpg'
    });
    await fakeProductsRepository.create({
      brandId: brand.id,
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      image: 'avengers.jpg'
    });
    const products = await listProducts.execute(brand.id);
    expect(products).toHaveLength(1);
  });
});