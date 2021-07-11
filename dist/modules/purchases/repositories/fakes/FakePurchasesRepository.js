"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Purchase = _interopRequireDefault(require("../../infra/typeorm/entities/Purchase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakePurchasesRepository {
  constructor() {
    this.purchases = [];
  }

  async index({
    page,
    brand
  }) {
    return this.purchases;
  }

  async findById(id) {
    const purchase = this.purchases.find(item => item.id === id);
    return purchase;
  }

  async create({
    price,
    product_id,
    quantity
  }) {
    const purchase = new _Purchase.default();
    Object.assign(purchase, {
      id: (0, _uuid.v4)(),
      price,
      quantity,
      productId: product_id
    });
    this.purchases.push(purchase);
    return purchase;
  }

  async save(purchase) {
    this.purchases.push(purchase);
  }

  async destroy(id) {
    const findIndex = this.purchases.findIndex(item => item.id === id);
    this.purchases.splice(findIndex, 1);
  }

}

var _default = FakePurchasesRepository;
exports.default = _default;