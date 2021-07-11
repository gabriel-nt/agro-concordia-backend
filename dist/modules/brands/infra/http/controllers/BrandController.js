"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _ListBrandService = _interopRequireDefault(require("../../../services/ListBrandService"));

var _ShowBrandService = _interopRequireDefault(require("../../../services/ShowBrandService"));

var _CreateBrandService = _interopRequireDefault(require("../../../services/CreateBrandService"));

var _UpdateBrandService = _interopRequireDefault(require("../../../services/UpdateBrandService"));

var _DeleteBrandService = _interopRequireDefault(require("../../../services/DeleteBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BrandController {
  async index(request, response) {
    const brandService = _tsyringe.container.resolve(_ListBrandService.default);

    const brands = await brandService.execute();
    return response.json((0, _classTransformer.classToClass)(brands));
  }

  async create(request, response) {
    const {
      brand,
      filePath
    } = request.body;
    const files = request.files;

    const brandService = _tsyringe.container.resolve(_CreateBrandService.default);

    const newBrand = await brandService.execute({
      brand,
      filePath,
      image: files.image[0].filename,
      backgroundImage: files.backgroundImage[0].filename
    });
    return response.json((0, _classTransformer.classToClass)(newBrand));
  }

  async show(request, response) {
    const {
      id
    } = request.params;

    const brandService = _tsyringe.container.resolve(_ShowBrandService.default);

    const brand = await brandService.execute(id);
    return response.json(brand);
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      brand,
      filePath
    } = request.body;
    const files = request.files;

    const brandService = _tsyringe.container.resolve(_UpdateBrandService.default);

    const updateBrand = await brandService.execute({
      id,
      brand,
      filePath,
      image: files.image[0].filename,
      backgroundImage: files.backgroundImage[0].filename
    });
    return response.json((0, _classTransformer.classToClass)(updateBrand));
  }

  async delete(request, response) {
    const {
      id
    } = request.params;

    const brandService = _tsyringe.container.resolve(_DeleteBrandService.default);

    const isDestroy = await brandService.execute(id);
    return response.json({
      success: isDestroy
    });
  }

}

var _default = BrandController;
exports.default = _default;