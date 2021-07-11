"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Sale = _interopRequireDefault(require("../entities/Sale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SalesRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Sale.default);
  }

  async index({
    page,
    brand
  }) {
    const sales = await this.ormRepository.find({
      relations: ['product', 'product.brand'],
      where: {
        brandId: brand
      },
      take: Number(process.env.TYPEORM_SALES_LIMIT),
      skip: page === 1 ? 0 : page * Number(process.env.TYPEORM_SALES_LIMIT)
    });
    return sales;
  }

  async findById(id) {
    const sale = await this.ormRepository.findOne(id, {
      relations: ['product']
    });
    return sale;
  }

  async create({
    quantity,
    product_id,
    price,
    brand_id
  }) {
    const sale = this.ormRepository.create({
      price: Number(price),
      productId: product_id,
      brandId: brand_id,
      quantity
    });
    await this.ormRepository.save(sale);
    return sale;
  }

  async save(sale) {
    await this.ormRepository.save(sale);
  }

  async destroy(id) {
    await this.ormRepository.delete(id);
  }

}

var _default = SalesRepository;
exports.default = _default;