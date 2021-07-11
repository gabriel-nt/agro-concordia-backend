import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import UpdateBrandService from './UpdateBrandService';

let fakeCacheProvider: FakeCacheProvider;
let fakeStorageProvider: FakeStorageProvider;
let fakeBrandsRepository: FakeBrandsRepository;
let updateBrand: UpdateBrandService;

describe('Update brand service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeBrandsRepository = new FakeBrandsRepository();

    updateBrand = new UpdateBrandService(
      fakeBrandsRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to update a brand', async () => {
    const createdBrand = await fakeBrandsRepository.create({
      brand: 'Galax',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
    });

    const brand = await updateBrand.execute({
      id: createdBrand.id,
      brand: 'Gigabyte',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
      filePath: 'brands',
    });

    expect(brand.brand).toEqual('Gigabyte');
  });

  it('should be able to update brand within non existing brand', async () => {
    await expect(
      updateBrand.execute({
        brand: 'non-exting-brand',
        id: 'non-existing-id',
        backgroundImage: 'image.jpg',
        image: 'image.jpg',
        filePath: 'brands',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
