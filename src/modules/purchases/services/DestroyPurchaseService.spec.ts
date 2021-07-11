import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakePurchasesRepository from '../repositories/fakes/FakePurchasesRepository';
import DestroyPurchaseService from './DestroyPurchaseService';

let fakeCacheProvider: FakeCacheProvider;
let fakeProductsRepository: FakeProductsRepository;
let fakePurchasesRepository: FakePurchasesRepository;
let destroyPurchase: DestroyPurchaseService;

describe('Destroy purchase service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductsRepository = new FakeProductsRepository();
    fakePurchasesRepository = new FakePurchasesRepository();

    destroyPurchase = new DestroyPurchaseService(
      fakePurchasesRepository,
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to destroy purchase', async () => {
    const purchase = await fakePurchasesRepository.create({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1',
    });

    const isDestroy = await destroyPurchase.execute(purchase.id);

    expect(isDestroy).toBeTruthy();
  });

  it('should be able to destroy within non existing purchase', async () => {
    await expect(
      destroyPurchase.execute('non-existing-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
