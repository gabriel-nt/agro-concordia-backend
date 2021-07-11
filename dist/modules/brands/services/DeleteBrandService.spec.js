"use strict";

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeBrandsRepository = _interopRequireDefault(require("../repositories/fakes/FakeBrandsRepository"));

var _DeleteBrandService = _interopRequireDefault(require("./DeleteBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeBrandsRepository;
let fakeStorageProvider;
let fakeCacheProvider;
let deleteBrandService;
describe('Delete brand service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    fakeBrandsRepository = new _FakeBrandsRepository.default();
    deleteBrandService = new _DeleteBrandService.default(fakeBrandsRepository, fakeStorageProvider, fakeCacheProvider);
  });
  it('should be able to delete a brand', async () => {
    const brand = await fakeBrandsRepository.create({
      brand: 'Galax',
      backgroundImage: 'image.jpg',
      image: 'image.jpg'
    });
    const response = await deleteBrandService.execute(brand.id);
    expect(response).toBeTruthy();
  });
});