import FakeBrandsRepository from '@modules/brands/repositories/fakes/FakeBrandsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakePurchasesRepository from '../repositories/fakes/FakePurchasesRepository';
import ListPurchasesService from './ListPurchasesService';

let fakeCacheProvider: FakeCacheProvider;
let fakeBrandsRepository: FakeBrandsRepository;
let fakePurchasesRepository: FakePurchasesRepository;
let listPurchases: ListPurchasesService;

describe('List purchases service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeBrandsRepository = new FakeBrandsRepository();
    fakePurchasesRepository = new FakePurchasesRepository();

    listPurchases = new ListPurchasesService(
      fakePurchasesRepository,
      fakeBrandsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list purchases', async () => {
    await fakePurchasesRepository.create({
      price: '20.9',
      quantity: 10,
      product_id: '1',
      brand_id: '1',
    });

    const purchases = await listPurchases.execute({
      brand: '1',
      page: 1,
    });

    expect(purchases).toHaveLength(1);
  });
});
