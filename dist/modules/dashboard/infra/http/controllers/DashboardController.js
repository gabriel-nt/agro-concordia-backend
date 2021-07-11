"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ListProductPerBrandService = _interopRequireDefault(require("../../../services/ListProductPerBrandService"));

var _ListSalesAndPurchasesLastWeekService = _interopRequireDefault(require("../../../services/ListSalesAndPurchasesLastWeekService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DashboardController {
  async index(request, response) {
    const dashboardService = _tsyringe.container.resolve(_ListProductPerBrandService.default);

    const productsBrands = await dashboardService.execute();
    return response.json(productsBrands);
  }

  async reports(request, response) {
    const dashboardService = _tsyringe.container.resolve(_ListSalesAndPurchasesLastWeekService.default);

    const productsBrands = await dashboardService.execute();
    return response.json(productsBrands);
  }

}

var _default = DashboardController;
exports.default = _default;