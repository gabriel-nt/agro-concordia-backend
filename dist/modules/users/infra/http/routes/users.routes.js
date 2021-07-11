"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _multer = _interopRequireDefault(require("multer"));

var _UserAvatarController = _interopRequireDefault(require("../controllers/UserAvatarController"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_upload.default.multer);
const usersRouter = (0, _express.Router)();
const usersController = new _UsersController.default();
const userAvatarController = new _UserAvatarController.default();
usersRouter.post('/', usersController.create);
usersRouter.put('/', _ensureAuthenticated.default, usersController.update);
usersRouter.patch('/avatar', _ensureAuthenticated.default, upload.single('avatar'), userAvatarController.update);
var _default = usersRouter;
exports.default = _default;