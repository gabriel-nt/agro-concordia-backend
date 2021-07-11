"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../../../shared/utils");

var _tsyringe = require("tsyringe");

var _CreateSaleService = _interopRequireDefault(require("../../../services/CreateSaleService"));

var _UpdateSaleService = _interopRequireDefault(require("../../../services/UpdateSaleService"));

var _DestroySaleService = _interopRequireDefault(require("../../../services/DestroySaleService"));

var _ListSalesService = _interopRequireDefault(require("../../../services/ListSalesService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SalesController {
  async index(request, response) {
    const {
      page,
      brand
    } = request.query;

    const saleService = _tsyringe.container.resolve(_ListSalesService.default);

    const sales = await saleService.execute({
      brand: String(brand),
      page: Number(page)
    });
    return response.json(sales);
  }

  async create(request, response) {
    const {
      product_id,
      brand_id,
      quantity,
      price
    } = request.body;

    const saleService = _tsyringe.container.resolve(_CreateSaleService.default);

    try {
      await saleService.execute({
        product_id,
        quantity,
        brand_id,
        price: (0, _utils.sanitize)(price, 'currency')
      });
      return response.json({
        message: 'Compra registrada com sucesso. Confira o seu histórico de venda!'
      });
    } catch (e) {
      console.log(e);
      return response.status(500).json({
        message: 'Ocorreu um erro durante a criação da venda. Tente novamente!'
      });
    }
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      price,
      quantity
    } = request.body;

    const saleService = _tsyringe.container.resolve(_UpdateSaleService.default);

    const purchase = await saleService.execute({
      id,
      price: (0, _utils.sanitize)(price, 'currency'),
      quantity
    });
    return response.json(purchase);
  }

  async destroy(request, response) {
    const {
      id
    } = request.params;

    const saleService = _tsyringe.container.resolve(_DestroySaleService.default);

    await saleService.execute(id);
    return response.status(201).json({
      message: `Histórico ${id} deletado com sucesso`
    });
  }

}

var _default = SalesController;
exports.default = _default;