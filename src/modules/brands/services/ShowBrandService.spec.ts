import AppError from '@shared/errors/AppError';
import FakeBrandsRepository from '../repositories/fakes/FakeBrandsRepository';
import ShowBrandService from './ShowBrandService';

let fakeBrandsRepository: FakeBrandsRepository;
let showBrand: ShowBrandService;

describe('Show brand service', () => {
  beforeEach(() => {
    fakeBrandsRepository = new FakeBrandsRepository();

    showBrand = new ShowBrandService(fakeBrandsRepository);
  });

  it('should be able to show a brand', async () => {
    const createdBrand = await fakeBrandsRepository.create({
      brand: 'Galax',
      backgroundImage: 'image.jpg',
      image: 'image.jpg',
    });

    const brand = await showBrand.execute(createdBrand.id);

    expect(brand).toHaveProperty('id');
  });

  it('should be able to show a brand within non existing brand', async () => {
    await expect(showBrand.execute('non-existing-id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
