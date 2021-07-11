import FakeBrandsRepository from '@modules/brands/repositories/fakes/FakeBrandsRepository';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ListProductsService from './ListProductsByBrandService';

let fakeBrandsRepository: FakeBrandsRepository;
let fakeProductsRepository: FakeProductsRepository;
let listProducts: ListProductsService;

describe('List products by brand service', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();
    fakeProductsRepository = new FakeProductsRepository();

    listProducts = new ListProductsService(
      fakeProductsRepository,
      fakeBrandsRepository,
    );
  });

  it('should be able to list products by brand', async () => {
    const brand = await fakeBrandsRepository.create({
      brand: 'Marvel',
      image: 'marvel.jpg',
      backgroundImage: 'background.jpg',
    });

    await fakeProductsRepository.create({
      brandId: brand.id,
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      image: 'avengers.jpg',
    });

    const products = await listProducts.execute(brand.id);

    expect(products).toHaveLength(1);
  });
});
