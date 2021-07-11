"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateProductService = _interopRequireDefault(require("../../../services/CreateProductService"));

var _ListProductsService = _interopRequireDefault(require("../../../services/ListProductsService"));

var _UpdateProductService = _interopRequireDefault(require("../../../services/UpdateProductService"));

var _ShowProductService = _interopRequireDefault(require("../../../services/ShowProductService"));

var _DeleteProductService = _interopRequireDefault(require("../../../services/DeleteProductService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsController {
  async index(request, response) {
    const {
      page,
      brand
    } = request.query;

    const productService = _tsyringe.container.resolve(_ListProductsService.default);

    const products = await productService.execute({
      brand: String(brand),
      page: Number(page)
    });
    return response.json((0, _classTransformer.classToClass)(products));
  }

  async create(request, response) {
    const userId = request.user.id;
    const {
      title,
      nick,
      description,
      brandId,
      price,
      salePrice,
      stock,
      filePath
    } = request.body;

    const productService = _tsyringe.container.resolve(_CreateProductService.default);

    const product = await productService.execute({
      brandId,
      description,
      nick,
      price,
      salePrice,
      stock,
      title,
      userId,
      filePath,
      file: request.file.filename
    });
    return response.json((0, _classTransformer.classToClass)(product));
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const productService = _tsyringe.container.resolve(_ShowProductService.default);

    const product = await productService.execute(id);
    return response.json((0, _classTransformer.classToClass)(product));
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const userId = request.user.id;
    const {
      title,
      nick,
      description,
      brandId,
      price,
      salePrice,
      stock,
      filePath
    } = request.body;

    const productService = _tsyringe.container.resolve(_UpdateProductService.default);

    const product = await productService.execute({
      brandId,
      description,
      nick,
      price,
      salePrice,
      stock,
      title,
      userId,
      id,
      filePath,
      file: request.file.filename
    });
    return response.json((0, _classTransformer.classToClass)(product));
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const productService = _tsyringe.container.resolve(_DeleteProductService.default);

    await productService.execute(id);
    return response.json({
      success: true
    });
  }

}

exports.default = ProductsController;