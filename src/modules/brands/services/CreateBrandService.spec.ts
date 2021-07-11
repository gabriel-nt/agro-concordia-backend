import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import CreateBrandService from './CreateBrandService';

let createBrand: CreateBrandService;
let fakeBrandsRepository: FakeBrandsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('Create brand service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeBrandsRepository = new FakeBrandsRepository();

    createBrand = new CreateBrandService(
      fakeBrandsRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new brand', async () => {
    const brand = await createBrand.execute({
      brand: 'Galax',
      image: 'image.jpg',
      filePath: 'brands/galax',
      backgroundImage: 'image.jpg',
    });

    expect(brand).toHaveProperty('id');
    expect(brand.brand).toEqual('Galax');
  });
});
