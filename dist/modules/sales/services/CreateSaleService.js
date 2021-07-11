"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IProductsRepository = _interopRequireDefault(require("../../products/repositories/IProductsRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ISalesRepository = _interopRequireDefault(require("../repositories/ISalesRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateSaleService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SalesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ISalesRepository.default === "undefined" ? Object : _ISalesRepository.default, typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateSaleService {
  constructor(salesRepository, productsRepository, cacheProvider) {
    this.salesRepository = salesRepository;
    this.productsRepository = productsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    price,
    product_id,
    quantity,
    brand_id
  }) {
    const productStock = await this.productsRepository.findProductStockById(product_id);

    if (!productStock) {
      throw new _AppError.default('Stock not found');
    }

    const {
      stock
    } = productStock;

    if (stock.stock === 0) {
      throw new _AppError.default('Zero stock');
    }

    await this.productsRepository.updateStock({
      id: stock.id,
      stock: Number(stock.stock) - Number(quantity)
    });
    const sale = await this.salesRepository.create({
      product_id,
      price,
      quantity,
      brand_id
    });
    await this.cacheProvider.invalidate('sales');
    await this.cacheProvider.invalidate('products');
    return sale;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateSaleService;
exports.default = _default;