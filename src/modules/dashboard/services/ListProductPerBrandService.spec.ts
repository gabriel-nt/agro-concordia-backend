import FakeDashboardRepository from '../repositories/fakes/FakeDashboardRepository';
import ListProductPerBrandService from './ListProductPerBrandService';

let fakeDashboardRepository: FakeDashboardRepository;
let listProductAndBrand: ListProductPerBrandService;

describe('List products per brand', () => {
  beforeEach(() => {
    fakeDashboardRepository = new FakeDashboardRepository();

    listProductAndBrand = new ListProductPerBrandService(
      fakeDashboardRepository,
    );
  });

  it('should be able to list products per brand', async () => {
    const response = await listProductAndBrand.execute();

    expect(response).toHaveLength(1);
  });
});
