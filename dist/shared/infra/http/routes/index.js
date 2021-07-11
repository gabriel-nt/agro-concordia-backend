"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _products = _interopRequireDefault(require("../../../../modules/products/infra/http/routes/products.routes"));

var _brands = _interopRequireDefault(require("../../../../modules/brands/infra/http/routes/brands.routes"));

var _purchases = _interopRequireDefault(require("../../../../modules/purchases/infra/http/routes/purchases.routes"));

var _sales = _interopRequireDefault(require("../../../../modules/sales/infra/http/routes/sales.routes"));

var _dashboard = _interopRequireDefault(require("../../../../modules/dashboard/infra/http/routes/dashboard.routes"));

var _itens = _interopRequireDefault(require("../../../../modules/products/infra/http/routes/itens.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/itens', _itens.default);
routes.use('/users', _users.default);
routes.use('/brands', _brands.default);
routes.use('/login', _sessions.default);
routes.use('/products', _products.default);
routes.use('/purchases', _purchases.default);
routes.use('/sales', _sales.default);
routes.use('/dashboard', _dashboard.default);
var _default = routes;
exports.default = _default;