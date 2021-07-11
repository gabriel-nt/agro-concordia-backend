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

let UpdateSaleService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SalesRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _ISalesRepository.default === "undefined" ? Object : _ISalesRepository.default, typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UpdateSaleService {
  constructor(salesRepository, productsRepository, cacheProvider) {
    this.salesRepository = salesRepository;
    this.productsRepository = productsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    id,
    quantity,
    price
  }) {
    const sale = await this.salesRepository.findById(id);

    if (!sale) {
      throw new _AppError.default(`Puchase with id ${id} not found`);
    }

    Object.assign(sale, {
      price,
      quantity
    });
    await this.salesRepository.save(sale);
    await this.cacheProvider.invalidate('sales');
    await this.cacheProvider.invalidate('products');
    const productStock = await this.productsRepository.findProductStockById(sale.productId);

    if (productStock) {
      const {
        stock
      } = productStock;
      const oldQuantity = sale.quantity;
      await this.productsRepository.updateStock({
        id: stock.id,
        stock: Number(stock.stock) + Number(oldQuantity) - Number(quantity)
      });
    }

    return sale;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = UpdateSaleService;
exports.default = _default;