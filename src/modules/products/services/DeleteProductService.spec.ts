import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import DeleteProductService from './DeleteProductService';

let fakeCacheProvider: FakeCacheProvider;
let fakeProductsRepository: FakeProductsRepository;
let deleteProduct: DeleteProductService;

describe('Delete product service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductsRepository = new FakeProductsRepository();

    deleteProduct = new DeleteProductService(
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to delete product', async () => {
    const product = await fakeProductsRepository.create({
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

    await deleteProduct.execute(product.id);
    const list = await fakeProductsRepository.index({
      brand: '10',
      page: 1,
    });

    expect(list.length).toEqual(0);
  });

  it('should be able to create within non existing product', async () => {
    await expect(
      deleteProduct.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
