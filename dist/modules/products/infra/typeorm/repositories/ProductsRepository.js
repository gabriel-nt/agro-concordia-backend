"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _Product = _interopRequireDefault(require("../entities/Product"));

var _Stock = _interopRequireDefault(require("../entities/Stock"));

var _ProductStock = _interopRequireDefault(require("../entities/ProductStock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepositoryStock = void 0;
    this.ormRepositoryProductStock = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Product.default);
    this.ormRepositoryStock = (0, _typeorm.getRepository)(_Stock.default);
    this.ormRepositoryProductStock = (0, _typeorm.getRepository)(_ProductStock.default);
  }

  async index({
    page,
    brand
  }) {
    const products = await this.ormRepository.find({
      relations: ['brand', 'productStock', 'productStock.stock'],
      where: brand !== 'undefined' ? {
        brandId: brand
      } : {},
      take: Number(process.env.TYPEORM_PRODUCTS_LIMIT),
      skip: page === 1 ? 0 : page * Number(process.env.TYPEORM_PRODUCTS_LIMIT)
    });
    return products;
  }

  async findById(id) {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  async findByName(name) {
    const product = await this.ormRepository.findOne({
      where: {
        title: name
      }
    });
    return product;
  }

  async findByBrand(id) {
    const product = await this.ormRepository.find({
      where: {
        brandId: id
      }
    });
    return product;
  }

  async findStockById(id) {
    const stock = await this.ormRepositoryStock.findOne(id);
    return stock;
  }

  async findProductStockById(id) {
    const productStock = await this.ormRepositoryProductStock.findOne({
      where: {
        productId: id
      },
      relations: ['stock']
    });
    return productStock;
  }

  async create({
    description,
    brandId,
    nick,
    price,
    title,
    salePrice,
    stock,
    userId,
    image
  }) {
    const product = this.ormRepository.create({
      title,
      description,
      nick,
      price,
      salePrice,
      brandId,
      userId,
      image
    });
    await this.ormRepository.save(product);
    const stocks = this.ormRepositoryStock.create({
      stock
    });
    await this.ormRepositoryStock.save(stocks);
    const productStock = this.ormRepositoryProductStock.create({
      stockId: stocks.id,
      productId: product.id
    });
    await this.ormRepositoryProductStock.save(productStock);
    return product;
  }

  async update({
    id,
    description,
    brandId,
    nick,
    price,
    title,
    salePrice,
    stock,
    userId
  }) {
    await this.ormRepository.update(id, {
      title,
      description,
      nick,
      price,
      salePrice,
      brandId,
      userId
    });
    const product = await this.ormRepository.findOne(id, {
      relations: ['brand', 'productStock', 'productStock.stock']
    });

    if (!product) {
      throw new _AppError.default('Not found product');
    }

    await this.ormRepository.save(product);
    const productStock = await this.ormRepositoryProductStock.findOne({
      where: {
        productId: id
      }
    });

    if (productStock) {
      const stocks = await this.ormRepositoryStock.findOne(productStock.stockId);

      if (stocks) {
        stocks.stock = stock;
        await this.ormRepositoryStock.save(stocks);
      }
    }

    return product;
  }

  async updateStock({
    id,
    stock
  }) {
    await this.ormRepositoryStock.update(id, {
      stock
    });
    const findStock = await this.ormRepositoryStock.findOne(id);
    return findStock;
  }

  async destroy(id) {
    await this.ormRepository.update(id, {
      trash: 1
    });
    const product = await this.ormRepository.findOne(id);

    if (!product) {
      throw new _AppError.default('Product not found');
    }

    await this.ormRepository.save(product);
  }

}

var _default = ProductRepository;
exports.default = _default;