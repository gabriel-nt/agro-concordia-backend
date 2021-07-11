"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _BrandController = _interopRequireDefault(require("../controllers/BrandController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const brandRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const brandController = new _BrandController.default();
brandRouter.use(_ensureAuthenticated.default);
brandRouter.get('/', brandController.index);
brandRouter.post('/', upload.fields([{
  name: 'image'
}, {
  name: 'backgroundImage'
}]), brandController.create);
brandRouter.get('/:id', brandController.show);
brandRouter.put('/:id', upload.fields([{
  name: 'image'
}, {
  name: 'backgroundImage'
}]), brandController.update);
brandRouter.delete(':/id', brandController.delete);
var _default = brandRouter;
exports.default = _default;