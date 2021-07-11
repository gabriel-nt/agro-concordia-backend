import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakePurchasesRepository from '../repositories/fakes/FakePurchasesRepository';
import UpdatePurchaseService from './UpdatePurchaseService';

let fakeCacheProvider: FakeCacheProvider;
let fakePurchasesRepository: FakePurchasesRepository;
let fakeProductsRepository: FakeProductsRepository;
let updatePurchase: UpdatePurchaseService;

describe('Update purchase service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductsRepository = new FakeProductsRepository();
    fakePurchasesRepository = new FakePurchasesRepository();

    updatePurchase = new UpdatePurchaseService(
      fakePurchasesRepository,
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update purchase', async () => {
    const purchase = await fakePurchasesRepository.create({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1',
    });

    const purchaseUpdated = await updatePurchase.execute({
      id: purchase.id,
      price: '20.8',
      quantity: 10,
    });

    expect(purchaseUpdated.price).toEqual('20.8');
    expect(purchaseUpdated.quantity).toEqual(10);
  });

  it('should be able to update within non existing purchase', async () => {
    await expect(
      updatePurchase.execute({
        id: 'non-existing-purchase',
        price: '10',
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
