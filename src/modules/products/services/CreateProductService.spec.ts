import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeStorageProvider: FakeStorageProvider;
let createProduct: CreateProductService;

describe('Create product service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeStorageProvider = new FakeStorageProvider();
    fakeProductsRepository = new FakeProductsRepository();

    createProduct = new CreateProductService(
      fakeProductsRepository,
      fakeStorageProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      brandId: '10',
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      filePath: 'avengers',
      file: 'avengers.jpg',
    });

    expect(product).toHaveProperty('id');
  });

  it('should be able to create a product same name', async () => {
    await createProduct.execute({
      brandId: '10',
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      filePath: 'avengers',
      file: 'avengers.jpg',
    });

    await expect(
      createProduct.execute({
        brandId: '10',
        description: 'Vingadores Guerra Infinita',
        title: 'Avengers End Game',
        nick: 'Avengers',
        price: 19.0,
        salePrice: 23.0,
        stock: 8,
        userId: '2',
        filePath: 'avengers',
        file: 'avengers-game-end.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
