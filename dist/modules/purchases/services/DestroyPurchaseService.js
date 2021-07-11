"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductsRepository = _interopRequireDefault(require("../../products/repositories/IProductsRepository"));

var _IPurchasesRepository = _interopRequireDefault(require("../repositories/IPurchasesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DestroyPurchaseService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('PurchasesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IPurchasesRepository.default === "undefined" ? Object : _IPurchasesRepository.default, typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class DestroyPurchaseService {
  constructor(purchasesRepository, productsRepository, cacheProvider) {
    this.purchasesRepository = purchasesRepository;
    this.productsRepository = productsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute(id) {
    const purchase = await this.purchasesRepository.findById(id);

    if (!purchase) {
      throw new _AppError.default('Purchase not found');
    }

    await this.purchasesRepository.destroy(id);
    await this.cacheProvider.invalidatePrefix('products');
    await this.cacheProvider.invalidatePrefix('purchases');
    const productStock = await this.productsRepository.findProductStockById(purchase.productId);

    if (productStock) {
      const {
        stock
      } = productStock;
      const oldQuantity = purchase.quantity;
      await this.productsRepository.updateStock({
        id: stock.id,
        stock: Number(stock.stock) - Number(oldQuantity)
      });
    }

    return true;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = DestroyPurchaseService;
exports.default = _default;