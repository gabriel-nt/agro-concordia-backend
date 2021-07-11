"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _PurchaseController = _interopRequireDefault(require("../controllers/PurchaseController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const purchasesRouter = (0, _express.Router)();
const purchasesController = new _PurchaseController.default();
purchasesRouter.use(_ensureAuthenticated.default);
purchasesRouter.get('/', purchasesController.index);
purchasesRouter.post('/', purchasesController.create);
purchasesRouter.put('/:id', purchasesController.update);
purchasesRouter.delete('/:id', purchasesController.destroy);
var _default = purchasesRouter;
exports.default = _default;