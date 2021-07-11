"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeBrandsRepository = _interopRequireDefault(require("../repositories/fakes/FakeBrandsRepository"));

var _UpdateBrandService = _interopRequireDefault(require("./UpdateBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeCacheProvider;
let fakeStorageProvider;
let fakeBrandsRepository;
let updateBrand;
describe('Update brand service', () => {
  beforeEach(() => {
    fakeCacheProvider = new _FakeCacheProvider.default();
    fakeStorageProvider = new _FakeStorageProvider.default();
    fakeBrandsRepository = new _FakeBrandsRepository.default();
    updateBrand = new _UpdateBrandService.default(fakeBrandsRepository, fakeStorageProvider, fakeCacheProvider);
  });
  it('should be able to update a brand', async () => {
    const createdBrand = await fakeBrandsRepository.create({
      brand: 'Galax',
      backgroundImage: 'image.jpg',
      image: 'image.jpg'
    });
    const brand = await updateBrand.execute({
      id: createdBrand.id,
      brand: 'Gigabyte',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
      filePath: 'brands'
    });
    expect(brand.brand).toEqual('Gigabyte');
  });
  it('should be able to update brand within non existing brand', async () => {
    await expect(updateBrand.execute({
      brand: 'non-exting-brand',
      id: 'non-existing-id',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
      filePath: 'brands'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});