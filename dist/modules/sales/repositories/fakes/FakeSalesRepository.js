"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Sale = _interopRequireDefault(require("../../infra/typeorm/entities/Sale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeSalesRepository {
  constructor() {
    this.sales = [];
  }

  async index({
    page,
    brand
  }) {
    return this.sales;
  }

  async findById(id) {
    const sale = this.sales.find(item => item.id === id);
    return sale;
  }

  async create({
    price,
    product_id,
    quantity
  }) {
    const sale = new _Sale.default();
    Object.assign(sale, {
      id: (0, _uuid.v4)(),
      price,
      quantity,
      productId: product_id
    });
    this.sales.push(sale);
    return sale;
  }

  async save(sale) {
    await this.sales.push(sale);
  }

  async destroy(id) {
    const findIndex = this.sales.findIndex(item => item.id === id);
    this.sales.splice(findIndex, 1);
  }

}

var _default = FakeSalesRepository;
exports.default = _default;