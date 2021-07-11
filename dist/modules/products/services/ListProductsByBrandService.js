"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IBrandsRepository = _interopRequireDefault(require("../../brands/repositories/IBrandsRepository"));

var _tsyringe = require("tsyringe");

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProductsByBrandService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProductsByBrandService {
  constructor(productsRepository, brandsRepository) {
    this.productsRepository = productsRepository;
    this.brandsRepository = brandsRepository;
  }

  async execute(brand) {
    const findBrand = await this.brandsRepository.findByName(brand);

    if (findBrand) {
      const {
        id
      } = findBrand;
      const products = await this.productsRepository.findByBrand(id);
      return products;
    }

    return [];
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListProductsByBrandService;
exports.default = _default;