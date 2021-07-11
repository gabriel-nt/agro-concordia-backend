import AppError from '@shared/errors/AppError';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSalesRepository from '../repositories/fakes/FakeSalesRepository';
import UpdateSaleService from './UpdateSaleService';

let fakeCacheProvider: FakeCacheProvider;
let fakeSalesRepository: FakeSalesRepository;
let fakeProductsRepository: FakeProductsRepository;
let updateSale: UpdateSaleService;

describe('Update sale service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeProductsRepository = new FakeProductsRepository();
    fakeSalesRepository = new FakeSalesRepository();

    updateSale = new UpdateSaleService(
      fakeSalesRepository,
      fakeProductsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to update sale', async () => {
    const sale = await fakeSalesRepository.create({
      price: '20.9',
      product_id: '1',
      quantity: 10,
      brand_id: '1',
    });

    const saleUpdated = await updateSale.execute({
      id: sale.id,
      price: '20.8',
      quantity: 10,
    });

    expect(saleUpdated.price).toEqual('20.8');
    expect(saleUpdated.quantity).toEqual(10);
  });

  it('should be able to update within non existing sale', async () => {
    await expect(
      updateSale.execute({
        id: 'non-existing-sale',
        price: '10',
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
