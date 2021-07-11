"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _SalesController = _interopRequireDefault(require("../controllers/SalesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const salesRouter = (0, _express.Router)();
const salesController = new _SalesController.default();
salesRouter.use(_ensureAuthenticated.default);
salesRouter.get('/', salesController.index);
salesRouter.post('/', salesController.create);
salesRouter.put('/:id', salesController.update);
salesRouter.delete('/:id', salesController.destroy);
var _default = salesRouter;
exports.default = _default;