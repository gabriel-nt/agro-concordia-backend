"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _IBrandsRepository = _interopRequireDefault(require("../repositories/IBrandsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateBrandService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('BrandsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IBrandsRepository.default === "undefined" ? Object : _IBrandsRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateBrandService {
  constructor(brandsRepository, storageProvider, cacheProvider) {
    this.brandsRepository = brandsRepository;
    this.storageProvider = storageProvider;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    brand,
    image,
    backgroundImage,
    filePath
  }) {
    const newBrand = await this.brandsRepository.create({
      brand,
      image: `${filePath}/${image}`,
      backgroundImage: `${filePath}/${backgroundImage}`
    });
    await this.storageProvider.saveFile({
      file: backgroundImage,
      filePath
    });
    await this.storageProvider.saveFile({
      file: image,
      filePath
    });
    await this.cacheProvider.invalidate('brands');
    return newBrand;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateBrandService;
exports.default = _default;