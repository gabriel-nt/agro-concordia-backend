"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Purchase = _interopRequireDefault(require("../entities/Purchase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PurchasesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Purchase.default);
  }

  async index({
    page,
    brand
  }) {
    const purchases = await this.ormRepository.find({
      relations: ['product', 'product.brand'],
      where: {
        brandId: brand
      },
      take: Number(process.env.TYPEORM_SALES_LIMIT),
      skip: page === 1 ? 0 : page * Number(process.env.TYPEORM_SALES_LIMIT)
    });
    return purchases;
  }

  async findById(id) {
    const purchase = await this.ormRepository.findOne(id, {
      relations: ['product']
    });
    return purchase;
  }

  async create({
    quantity,
    product_id,
    price,
    brand_id
  }) {
    const purchase = this.ormRepository.create({
      price: Number(price),
      productId: product_id,
      brandId: brand_id,
      quantity
    });
    await this.ormRepository.save(purchase);
    return purchase;
  }

  async save(purchase) {
    await this.ormRepository.save(purchase);
  }

  async destroy(id) {
    await this.ormRepository.delete(id);
  }

}

var _default = PurchasesRepository;
exports.default = _default;