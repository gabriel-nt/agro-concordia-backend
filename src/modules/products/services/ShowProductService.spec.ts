import Product from '../infra/typeorm/entities/Product';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ShowProductService from './ShowProductService';

let fakeProductsRepository: FakeProductsRepository;
let showProduct: ShowProductService;

describe('List products service', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    showProduct = new ShowProductService(fakeProductsRepository);
  });

  it('should be able to list products', async () => {
    const createProduct = await fakeProductsRepository.create({
      brandId: '10',
      description: 'Vingadores Ultimato',
      title: 'Avengers End Game',
      nick: 'Avengers',
      price: 20.0,
      salePrice: 25.0,
      stock: 10,
      userId: '1',
      image: 'avengers.jpg',
    });

    const product = await showProduct.execute(createProduct.id);

    expect(product).toBeInstanceOf(Product || undefined);
  });
});
