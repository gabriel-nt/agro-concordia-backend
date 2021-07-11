"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IDashboardRepository = _interopRequireDefault(require("../repositories/IDashboardRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListSalesAndPurchasesLastWeekService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DashboardRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDashboardRepository.default === "undefined" ? Object : _IDashboardRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListSalesAndPurchasesLastWeekService {
  constructor(dashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  async execute() {
    const response = await this.dashboardRepository.findByLastWeek();
    return response;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListSalesAndPurchasesLastWeekService;
exports.default = _default;