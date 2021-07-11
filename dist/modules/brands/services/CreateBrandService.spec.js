"use strict";

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeBrandsRepository = _interopRequireDefault(require("../repositories/fakes/FakeBrandsRepository"));

var _CreateBrandService = _interopRequireDefault(require("./CreateBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createBrand;
let fakeBrandsRepository;
let fakeStorageProvider;
let fakeCacheProvider;
describe('Create brand service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    fakeBrandsRepository = new _FakeBrandsRepository.default();
    createBrand = new _CreateBrandService.default(fakeBrandsRepository, fakeStorageProvider, fakeCacheProvider);
  });
  it('should be able to create a new brand', async () => {
    const brand = await createBrand.execute({
      brand: 'Galax',
      image: 'image.jpg',
      filePath: 'brands/galax',
      backgroundImage: 'image.jpg'
    });
    expect(brand).toHaveProperty('id');
    expect(brand.brand).toEqual('Galax');
  });
});