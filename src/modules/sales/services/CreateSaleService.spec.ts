import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSalesRepository from '../repositories/fakes/FakeSalesRepository';
import CreateSaleService from './CreateSaleService';

let fakeCacheProvider: FakeCacheProvider;
let fakeSaleRepository: FakeSalesRepository;
let fakeProductsRepository: FakeProductsRepository;
let createSale: CreateSaleService;

describe('Create purchase service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductsRepository = new FakeProductsRepository();
    fakeSaleRepository = new FakeSalesRepository();

    createSale = new CreateSaleService(
      fakeSaleRepository,
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new purchase', async () => {
    const sale = await createSale.execute({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1',
    });

    expect(sale).toHaveProperty('id');
  });
});
