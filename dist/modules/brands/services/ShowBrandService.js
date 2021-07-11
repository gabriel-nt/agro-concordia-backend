"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IBrandsRepository = _interopRequireDefault(require("../repositories/IBrandsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ShowBrandService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ShowBrandService {
  constructor(brandsRepository) {
    this.brandsRepository = brandsRepository;
  }

  async execute(id) {
    const findBrand = await this.brandsRepository.findById(id);

    if (!findBrand) {
      throw new _AppError.default('Brand not found');
    }

    return findBrand;
  }

}) || _class) || _class) || _class) || _class);
var _default = ShowBrandService;
exports.default = _default;