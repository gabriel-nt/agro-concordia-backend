import FakeBrandsRepository from '@modules/brands/repositories/fakes/FakeBrandsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeSalesRepository from '../repositories/fakes/FakeSalesRepository';
import ListSalesService from './ListSalesService';

let fakeCacheProvider: FakeCacheProvider;
let fakeSalesRepository: FakeSalesRepository;
let fakeBrandsRepository: FakeBrandsRepository;
let listSales: ListSalesService;

describe('List sales service', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeSalesRepository = new FakeSalesRepository();
    fakeBrandsRepository = new FakeBrandsRepository();

    listSales = new ListSalesService(
      fakeSalesRepository,
      fakeBrandsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list sales', async () => {
    await fakeSalesRepository.create({
      price: '20.9',
      quantity: 10,
      product_id: '1',
      brand_id: '1',
    });

    const sales = await listSales.execute({
      page: 1,
      brand: '1',
    });

    expect(sales).toHaveLength(1);
  });
});
