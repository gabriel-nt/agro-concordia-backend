"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/ensureAuthenticated"));

var _DashboardController = _interopRequireDefault(require("../controllers/DashboardController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dashboardRouter = (0, _express.Router)();
const dashboardController = new _DashboardController.default();
dashboardRouter.use(_ensureAuthenticated.default);
dashboardRouter.get('/', dashboardController.index);
dashboardRouter.get('/reports', dashboardController.reports);
var _default = dashboardRouter;
exports.default = _default;