import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ListProductsService from './ListProductsService';

let fakeCacheProvider: FakeCacheProvider;
let fakeProductsRepository: FakeProductsRepository;
let listProducts: ListProductsService;

describe('List products service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductsRepository = new FakeProductsRepository();

    listProducts = new ListProductsService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list products', async () => {
    await fakeProductsRepository.create({
      brandId: '10',
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      image: 'avengers.jpg',
    });

    const products = await listProducts.execute({
      page: 1,
      brand: '10',
    });

    expect(products).toHaveLength(1);
  });
});
