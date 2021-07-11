"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProductsByBrandService = _interopRequireDefault(require("../../../services/ListProductsByBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ItensController {
  async getProductsByBrand(request, response) {
    const {
      brand
    } = request.query;

    if (brand) {
      const productService = _tsyringe.container.resolve(_ListProductsByBrandService.default);

      const product = await productService.execute(String(brand));
      return response.json(product);
    }

    return response.json([]);
  }

}

exports.default = ItensController;