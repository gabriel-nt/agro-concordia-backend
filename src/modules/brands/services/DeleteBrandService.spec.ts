import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import DeleteBrandService from './DeleteBrandService';

let fakeBrandsRepository: FakeBrandsRepository;
let fakeStorageProvider: FakeStorageProvider;
let fakeCacheProvider: FakeCacheProvider;
let deleteBrandService: DeleteBrandService;

describe('Delete brand service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeBrandsRepository = new FakeBrandsRepository();

    deleteBrandService = new DeleteBrandService(
      fakeBrandsRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to delete a brand', async () => {
    const brand = await fakeBrandsRepository.create({
      brand: 'Galax',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
    });

    const response = await deleteBrandService.execute(brand.id);

    expect(response).toBeTruthy();
  });
});
