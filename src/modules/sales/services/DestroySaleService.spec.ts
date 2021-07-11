import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeSalesRepository from '../repositories/fakes/FakeSalesRepository';
import DestroySaleService from './DestroySaleService';

let fakeCacheProvider: FakeCacheProvider;
let fakeSalesRepository: FakeSalesRepository;
let fakeProductsRepository: FakeProductsRepository;
let destroySale: DestroySaleService;

describe('Destroy sale service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductsRepository = new FakeProductsRepository();
    fakeSalesRepository = new FakeSalesRepository();

    destroySale = new DestroySaleService(
      fakeSalesRepository,
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to destroy sale', async () => {
    const purchase = await fakeSalesRepository.create({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1',
    });

    await destroySale.execute(purchase.id);
    const list = await fakeSalesRepository.index({
      page: 1,
    });

    expect(list.length).toEqual(0);
  });

  it('should be able to destroy within non existing sale', async () => {
    await expect(destroySale.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
