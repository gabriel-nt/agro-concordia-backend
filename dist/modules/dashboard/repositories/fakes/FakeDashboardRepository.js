"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Product = _interopRequireDefault(require("../../../products/infra/typeorm/entities/Product"));

var _Brand = _interopRequireDefault(require("../../../brands/infra/typeorm/entities/Brand"));

var _uuid = require("uuid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeDashboardRepository {
  constructor() {
    this.brands = [];
    this.products = [];
    const brand = new _Brand.default();
    const product = new _Product.default();
    Object.assign(brand, {
      id: (0, _uuid.v4)(),
      brand: 'Brand'
    });
    Object.assign(product, {
      id: (0, _uuid.v4)(),
      description: 'Teste',
      brandId: 1,
      nick: 'Teste',
      price: 10.0,
      title: 'Title',
      salePrice: 10.0,
      userId: '1'
    });
    this.brands.push(brand);
    this.products.push(product);
  }

  async index() {
    return {
      brands: this.brands,
      products: this.products
    };
  }

  async findByLastWeek() {
    return {
      sales: {
        count: [{
          day: '2020-02-10',
          total: 2
        }],
        total: [{
          day: '2020-02-10',
          total: 2
        }]
      },
      purchases: {
        count: [{
          day: '2020-02-10',
          total: 2
        }],
        total: [{
          day: '2020-02-10',
          total: 2
        }]
      }
    };
  }

}

var _default = FakeDashboardRepository;
exports.default = _default;