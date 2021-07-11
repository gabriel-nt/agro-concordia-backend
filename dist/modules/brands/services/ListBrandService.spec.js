"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeBrandsRepository = _interopRequireDefault(require("../repositories/fakes/FakeBrandsRepository"));

var _ListBrandService = _interopRequireDefault(require("./ListBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeBrandsRepository;
let listBrands;
describe('List brand service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeBrandsRepository = new _FakeBrandsRepository.default();
    listBrands = new _ListBrandService.default(fakeBrandsRepository, fakeCacheProvider);
  });
  it('should be able to list brands', async () => {
    await fakeBrandsRepository.create({
      brand: 'Galax',
      backgroundImage: 'image.jpg',
      image: 'image.jpg'
    });
    await fakeBrandsRepository.create({
      brand: 'Cougar',
      backgroundImage: 'image.jpg',
      image: 'image.jpg'
    });
    await fakeBrandsRepository.create({
      brand: 'Gigabyte',
      backgroundImage: 'image.jpg',
      image: 'image.jpg'
    });
    const brands = await listBrands.execute();
    expect(brands).toHaveLength(3);
  });
});