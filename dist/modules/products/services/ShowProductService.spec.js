"use strict";

var _Product = _interopRequireDefault(require("../infra/typeorm/entities/Product"));

var _FakeProductsRepository = _interopRequireDefault(require("../repositories/fakes/FakeProductsRepository"));

var _ShowProductService = _interopRequireDefault(require("./ShowProductService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeProductsRepository;
let showProduct;
describe('List products service', () => {
  beforeEach(() => {
    fakeProductsRepository = new _FakeProductsRepository.default();
    showProduct = new _ShowProductService.default(fakeProductsRepository);
  });
  it('should be able to list products', async () => {
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
    const product = await showProduct.execute(createProduct.id);
    expect(product).toBeInstanceOf(_Product.default || undefined);
  });
});