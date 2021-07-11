"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IBrandsRepository = _interopRequireDefault(require("../repositories/IBrandsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteBrandService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DeleteBrandService {
  constructor(brandsRepository, storageProvider, cacheProvider) {
    this.brandsRepository = brandsRepository;
    this.storageProvider = storageProvider;
    this.cacheProvider = cacheProvider;
  }

  async execute(id) {
    const findBrand = await this.brandsRepository.findById(id);

    if (!findBrand) {
      throw new _AppError.default('Brand not existing');
    }

    if (findBrand.image) {
      await this.storageProvider.deleteFile(findBrand.image);
    }

    if (findBrand.backgroundImage) {
      await this.storageProvider.deleteFile(findBrand.backgroundImage);
    }

    await this.brandsRepository.destroy(findBrand.id);
    await this.cacheProvider.invalidate('brands');
    return true;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = DeleteBrandService;
exports.default = _default;