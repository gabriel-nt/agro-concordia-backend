"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _express = require("express");

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _ProductsController = _interopRequireDefault(require("../controllers/ProductsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productsRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const productsController = new _ProductsController.default();
productsRouter.use(_ensureAuthenticated.default);
productsRouter.get('/', productsController.index);
productsRouter.post('/', upload.single('image'), productsController.create);
productsRouter.get('/:id', productsController.show);
productsRouter.put('/:id', upload.single('image'), productsController.update);
productsRouter.delete('/:id', productsController.delete);
var _default = productsRouter;
exports.default = _default;