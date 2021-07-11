"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Sale = _interopRequireDefault(require("../../../../sales/infra/typeorm/entities/Sale"));

var _Brand = _interopRequireDefault(require("../../../../brands/infra/typeorm/entities/Brand"));

var _Product = _interopRequireDefault(require("../../../../products/infra/typeorm/entities/Product"));

var _Purchase = _interopRequireDefault(require("../../../../purchases/infra/typeorm/entities/Purchase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DashboardRepository {
  constructor() {
    this.ormRepositoryProduct = void 0;
    this.ormRepositoryBrand = void 0;
    this.ormRepositorySale = void 0;
    this.ormRepositorySale = (0, _typeorm.getRepository)(_Sale.default);
    this.ormRepositoryBrand = (0, _typeorm.getRepository)(_Brand.default);
    this.ormRepositoryProduct = (0, _typeorm.getRepository)(_Product.default);
  }

  async index() {
    const products = await this.ormRepositoryProduct.find({
      select: ['id', 'title', 'nick', 'brandId', 'productStock'],
      relations: ['productStock', 'productStock.stock']
    });
    const brands = await this.ormRepositoryBrand.find();
    return {
      brands,
      products
    };
  }

  async findByLastWeek() {
    const salesLength = await (0, _typeorm.getRepository)(_Sale.default).createQueryBuilder('sales').select(`date_trunc('day', created_at)`, 'day').addSelect('SUM(quantity)', 'total').orderBy('day', 'ASC').groupBy('1').getRawMany();
    const salesSum = await (0, _typeorm.getRepository)(_Sale.default).createQueryBuilder('sales').select(`date_trunc('day', created_at)`, 'day').addSelect('SUM(price)', 'total').addSelect('SUM(quantity)', 'total').orderBy('day', 'ASC').groupBy('1').getRawMany();
    const purchasesLength = await (0, _typeorm.getRepository)(_Purchase.default).createQueryBuilder('purchases').select(`date_trunc('day', created_at)`, 'day').addSelect('SUM(quantity)', 'total').orderBy('day', 'ASC').groupBy('1').getRawMany();
    const purchasesSum = await (0, _typeorm.getRepository)(_Purchase.default).createQueryBuilder('purchases').select(`date_trunc('day', created_at)`, 'day').addSelect('SUM(price)', 'price').addSelect('SUM(quantity)', 'quantity').orderBy('day', 'ASC').groupBy('1').getRawMany();
    return {
      sales: {
        count: salesLength,
        total: salesSum.map(item => ({
          day: item.day,
          total: Number(item.price) * Number(item.quantity)
        }))
      },
      purchases: {
        count: purchasesLength,
        total: purchasesSum.map(item => ({
          day: item.day,
          total: Number(item.price) * Number(item.quantity)
        }))
      }
    };
  }

}

var _default = DashboardRepository;
exports.default = _default;