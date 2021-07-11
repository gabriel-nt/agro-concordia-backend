"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CreatePurchaseService = _interopRequireDefault(require("../../../services/CreatePurchaseService"));

var _DestroyPurchaseService = _interopRequireDefault(require("../../../services/DestroyPurchaseService"));

var _ListPurchasesService = _interopRequireDefault(require("../../../services/ListPurchasesService"));

var _UpdatePurchaseService = _interopRequireDefault(require("../../../services/UpdatePurchaseService"));

var _utils = require("../../../../../shared/utils");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PurchaseController {
  async index(request, response) {
    const {
      page,
      brand
    } = request.query;

    const purchaseService = _tsyringe.container.resolve(_ListPurchasesService.default);

    const purchases = await purchaseService.execute({
      brand: String(brand),
      page: Number(page)
    });
    return response.json(purchases);
  }

  async create(request, response) {
    const {
      product_id,
      quantity,
      brand_id,
      price
    } = request.body;

    const purchaseService = _tsyringe.container.resolve(_CreatePurchaseService.default);

    try {
      await purchaseService.execute({
        product_id,
        quantity,
        brand_id,
        price: (0, _utils.sanitize)(price, 'currency')
      });
      return response.json({
        message: 'Compra registrada com sucesso. Confira o seu histórico de compra!'
      });
    } catch (e) {
      return response.status(400).json({
        message: 'Ocorreu um erro durante a criação da compra. Tente novamente!'
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

    const purchaseService = _tsyringe.container.resolve(_UpdatePurchaseService.default);

    const purchase = await purchaseService.execute({
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

    const purchaseService = _tsyringe.container.resolve(_DestroyPurchaseService.default);

    await purchaseService.execute(id);
    return response.status(200).json({
      message: `Histórico ${id} deletado com sucesso`
    });
  }

}

var _default = PurchaseController;
exports.default = _default;