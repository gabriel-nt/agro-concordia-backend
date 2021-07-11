"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateProductService {
  constructor(productsRepository, storageProvider, cacheProvider) {
    this.productsRepository = productsRepository;
    this.storageProvider = storageProvider;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    nick,
    title,
    stock,
    price,
    salePrice,
    brandId,
    description,
    userId,
    file,
    filePath
  }) {
    const findProductInSameName = await this.productsRepository.findByName(title);

    if (findProductInSameName) {
      throw new _AppError.default('This product is already booked');
    }

    const product = await this.productsRepository.create({
      brandId,
      description,
      nick,
      price,
      salePrice,
      stock,
      title,
      userId,
      image: `${filePath}/${file}`
    });
    await this.storageProvider.saveFile({
      file,
      filePath
    });
    await this.cacheProvider.invalidatePrefix('products');
    return product;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateProductService;
exports.default = _default;