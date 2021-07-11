import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import UpdateProductService from './UpdateProductService';

let fakeCacheProvider: FakeCacheProvider;
let fakeStorageProvider: FakeStorageProvider;
let fakeProductsRepository: FakeProductsRepository;
let updateProduct: UpdateProductService;

describe('Update product service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeProductsRepository = new FakeProductsRepository();

    updateProduct = new UpdateProductService(
      fakeProductsRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to update product', async () => {
    const createProduct = await fakeProductsRepository.create({
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

    const product = await updateProduct.execute({
      brandId: '2',
      description: 'Vingadores Guerra Infinita',
      title: 'Avengers Infinity War',
      nick: 'Avengers',
      price: 15.0,
      salePrice: 22.0,
      stock: 2,
      userId: '1',
      id: createProduct.id,
      file: 'avengers.jpg',
      filePath: 'avengers',
    });

    expect(product.price).toEqual(15.0);
    expect(product.salePrice).toEqual(22.0);
    expect(product.title).toEqual('Avengers Infinity War');
  });
});
