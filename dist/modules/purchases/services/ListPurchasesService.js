"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IBrandsRepository = _interopRequireDefault(require("../../brands/repositories/IBrandsRepository"));

var _classTransformer = require("class-transformer");

var _IPurchasesRepository = _interopRequireDefault(require("../repositories/IPurchasesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListPurchasesService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PurchasesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPurchasesRepository.default === "undefined" ? Object : _IPurchasesRepository.default, typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class ListPurchasesService {
  constructor(purchasesRepository, brandsRepository, cacheProvider) {
    this.purchasesRepository = purchasesRepository;
    this.brandsRepository = brandsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    brand,
    page
  }) {
    let purchases = await this.cacheProvider.recover(`purchases-${brand}`);

    if (!purchases) {
      const brandId = await this.brandsRepository.findByName(brand);
      purchases = await this.purchasesRepository.index({
        page,
        brand: brandId && brandId.id
      });
      await this.cacheProvider.save(`purchases-${brand}`, (0, _classTransformer.classToClass)(purchases));
    }

    return purchases;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = ListPurchasesService;
exports.default = _default;