"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ItensController = _interopRequireDefault(require("../controllers/ItensController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const itensRouter = (0, _express.Router)();
const itensController = new _ItensController.default();
itensRouter.use(_ensureAuthenticated.default);
itensRouter.get('/', itensController.getProductsByBrand);
var _default = itensRouter;
exports.default = _default;