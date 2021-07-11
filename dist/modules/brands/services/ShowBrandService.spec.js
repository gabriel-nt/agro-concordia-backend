"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeBrandsRepository = _interopRequireDefault(require("../repositories/fakes/FakeBrandsRepository"));

var _ShowBrandService = _interopRequireDefault(require("./ShowBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeBrandsRepository;
let showBrand;
describe('Show brand service', () => {
  beforeEach(() => {
    fakeBrandsRepository = new _FakeBrandsRepository.default();
    showBrand = new _ShowBrandService.default(fakeBrandsRepository);
  });
  it('should be able to show a brand', async () => {
    const createdBrand = await fakeBrandsRepository.create({
      brand: 'Galax',
      backgroundImage: 'image.jpg',
      image: 'image.jpg'
    });
    const brand = await showBrand.execute(createdBrand.id);
    expect(brand).toHaveProperty('id');
  });
  it('should be able to show a brand within non existing brand', async () => {
    await expect(showBrand.execute('non-existing-id')).rejects.toBeInstanceOf(_AppError.default);
  });
});