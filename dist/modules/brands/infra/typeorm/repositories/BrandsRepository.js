"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Brand = _interopRequireDefault(require("../entities/Brand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BrandsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Brand.default);
  }

  async index() {
    const brands = await this.ormRepository.find();
    return brands;
  }

  async findById(id) {
    const brand = this.ormRepository.findOne(id);
    return brand;
  }

  async findByName(name) {
    const brand = this.ormRepository.findOne({
      where: {
        brand: name
      }
    });
    return brand;
  }

  async create({
    brand,
    backgroundImage,
    image
  }) {
    const newBrand = this.ormRepository.create({
      brand,
      image,
      backgroundImage
    });
    await this.ormRepository.save(newBrand);
    return newBrand;
  }

  async destroy(id) {
    await this.ormRepository.delete(id);
  }

  async save(brand) {
    await this.ormRepository.save(brand);
  }

}

var _default = BrandsRepository;
exports.default = _default;