"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProductsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListProductsService {
  constructor(productsRepository, cacheProvider) {
    this.productsRepository = productsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    brand,
    page
  }) {
    let products = await this.cacheProvider.recover(`products-${brand}`);

    if (!products) {
      products = await this.productsRepository.index({
        brand,
        page
      });
      await this.cacheProvider.save(`products-${brand}`, (0, _classTransformer.classToClass)(products));
    }

    return products;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = ListProductsService;
exports.default = _default;