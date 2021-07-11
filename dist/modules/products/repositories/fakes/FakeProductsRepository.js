"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Product = _interopRequireDefault(require("../../infra/typeorm/entities/Product"));

var _ProductStock = _interopRequireDefault(require("../../infra/typeorm/entities/ProductStock"));

var _Stock = _interopRequireDefault(require("../../infra/typeorm/entities/Stock"));

var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeProductsRepository {
  constructor() {
    this.products = [];
    this.stocks = [];
    this.productStock = [];
  }

  async index({
    brand,
    page
  }) {
    return this.products;
  }

  async findById(id) {
    const product = this.products.find(item => item.id === id);
    return product;
  }

  async findByName(name) {
    const product = this.products.find(item => item.title === name);
    return product;
  }

  async findStockById(id) {
    const stock = this.stocks.find(item => item.id === id);
    return stock;
  }

  async findByBrand(id) {
    const products = this.products.filter(item => item.brandId === id);
    return products;
  }

  async findProductStockById(id) {
    const productStock = this.productStock.find(item => item.id === id);
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
    userId
  }) {
    const product = new _Product.default();
    Object.assign(product, {
      id: (0, _uuid.v4)(),
      description,
      brandId,
      nick,
      price,
      title,
      salePrice,
      userId
    });
    this.products.push(product);
    const stocks = new _Stock.default();
    Object.assign(stocks, {
      id: (0, _uuid.v4)(),
      stock
    });
    this.stocks.push(stocks);
    const productStock = new _ProductStock.default();
    Object.assign(productStock, {
      id: (0, _uuid.v4)(),
      productId: product.id,
      stockId: stocks.id
    });
    this.productStock.push(productStock);
    return product;
  }

  async updateStock({
    id,
    stock
  }) {
    const findIndex = this.stocks.findIndex(item => item.id === id);
    this.stocks[findIndex].stock = stock;
    return this.stocks[findIndex];
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
    const findIndex = this.products.findIndex(item => item.id === id);
    const findProduct = this.products.find(item => item.id === id);

    if (!findProduct) {
      throw new _AppError.default('Product not found');
    }

    Object.assign(findProduct, {
      description,
      brandId,
      nick,
      price,
      title,
      salePrice,
      stock,
      userId
    });
    this.products[findIndex] = findProduct;
    const findProductStock = this.productStock.find(item => item.productId === id);

    if (findProductStock) {
      const findStock = this.stocks.find(item => item.id === findProductStock.stockId);
      const findIndexStock = this.stocks.findIndex(item => item.id === findProductStock.stockId);

      if (findStock) {
        findStock.stock = stock;
        this.stocks[findIndexStock] = findStock;
      }
    }

    return findProduct;
  }

  async destroy(id) {
    const findIndex = this.products.findIndex(item => item.id === id);
    this.products[findIndex].trash = 1;
  }

}

var _default = FakeProductsRepository;
exports.default = _default;