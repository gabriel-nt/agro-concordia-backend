"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _IBrandsRepository = _interopRequireDefault(require("../repositories/IBrandsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListBrandService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListBrandService {
  constructor(brandsRepository, cacheProvider) {
    this.brandsRepository = brandsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute() {
    let brands = await this.cacheProvider.recover('brands');
    await this.cacheProvider.invalidate('brands');

    if (!brands) {
      brands = await this.brandsRepository.index();
      await this.cacheProvider.save('brands', (0, _classTransformer.classToClass)(brands));
    }

    return brands;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListBrandService;
exports.default = _default;