import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import ListBrandService from './ListBrandService';

let fakeCacheProvider: FakeCacheProvider;
let fakeBrandsRepository: FakeBrandsRepository;
let listBrands: ListBrandService;

describe('List brand service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeBrandsRepository = new FakeBrandsRepository();

    listBrands = new ListBrandService(fakeBrandsRepository, fakeCacheProvider);
  });

  it('should be able to list brands', async () => {
    await fakeBrandsRepository.create({
      brand: 'Galax',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
    });
    await fakeBrandsRepository.create({
      brand: 'Cougar',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
    });
    await fakeBrandsRepository.create({
      brand: 'Gigabyte',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
    });

    const brands = await listBrands.execute();

    expect(brands).toHaveLength(3);
  });
});
