"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _IDashboardRepository = _interopRequireDefault(require("../repositories/IDashboardRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProductPerBrandService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('DashboardRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDashboardRepository.default === "undefined" ? Object : _IDashboardRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProductPerBrandService {
  constructor(dashboardRepository) {
    this.dashboardRepository = dashboardRepository;
  }

  async execute() {
    const {
      brands,
      products
    } = await this.dashboardRepository.index();
    const response = (0, _classTransformer.classToClass)(brands).map(brand => {
      const data = products.filter(product => product.brandId === brand.id).map(product => {
        const {
          stock
        } = product.productStock;
        return {
          id: product.id,
          title: product.title,
          nick: product.nick,
          stock: stock.stock
        };
      });
      return {
        id: brand.id,
        stock: data.length > 0 ? data.reduce((total, item) => total + (item ? item.stock : 0), 0) : 0,
        title: brand.brand,
        backgroundImage: brand.backgroundImage,
        data
      };
    });
    return response;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProductPerBrandService;
exports.default = _default;