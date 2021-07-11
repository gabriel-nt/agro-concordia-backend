"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Brand = _interopRequireDefault(require("../../infra/typeorm/entities/Brand"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeBrandsRepository {
  constructor() {
    this.brands = [];
  }

  async index() {
    return this.brands;
  }

  async create({
    brand,
    image,
    backgroundImage
  }) {
    const createdBrand = new _Brand.default();
    Object.assign(createdBrand, {
      id: (0, _uuid.v4)(),
      brand,
      image,
      backgroundImage
    });
    this.brands.push(createdBrand);
    return createdBrand;
  }

  async findById(id) {
    const brand = this.brands.find(findBrand => findBrand.id === id);
    return brand;
  }

  async findByName(name) {
    const brand = this.brands.find(findBrand => name.toLocaleLowerCase() === findBrand.brand.toLocaleLowerCase());
    return brand;
  }

  async save(brand) {
    this.brands.push(brand);
  }

  async destroy(id) {
    const findIndex = this.brands.findIndex(item => item.id === id);
    this.brands.splice(findIndex, 1);
  }

}

var _default = FakeBrandsRepository;
exports.default = _default;