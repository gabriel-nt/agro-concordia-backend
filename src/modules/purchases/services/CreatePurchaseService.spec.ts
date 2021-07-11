import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakePurchasesRepository from '../repositories/fakes/FakePurchasesRepository';
import CreatePurchaseService from './CreatePurchaseService';

let fakePurchaseRepository: FakePurchasesRepository;
let fakeProductsRepository: FakeProductsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createPurchase: CreatePurchaseService;

describe('Create purchase service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductsRepository = new FakeProductsRepository();
    fakePurchaseRepository = new FakePurchasesRepository();

    createPurchase = new CreatePurchaseService(
      fakePurchaseRepository,
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new purchase', async () => {
    const purchase = await createPurchase.execute({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1',
    });

    expect(purchase).toHaveProperty('id');
  });
});
