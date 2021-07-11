"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

require("../../modules/users/providers");

var _ProductsRepository = _interopRequireDefault(require("../../modules/products/infra/typeorm/repositories/ProductsRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _BrandsRepository = _interopRequireDefault(require("../../modules/brands/infra/typeorm/repositories/BrandsRepository"));

var _PurchasesRepository = _interopRequireDefault(require("../../modules/purchases/infra/typeorm/repositories/PurchasesRepository"));

var _SalesRepository = _interopRequireDefault(require("../../modules/sales/infra/typeorm/repositories/SalesRepository"));

var _DashboardRepository = _interopRequireDefault(require("../../modules/dashboard/infra/typeorm/repositories/DashboardRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('ProductsRepository', _ProductsRepository.default);

_tsyringe.container.registerSingleton('BrandsRepository', _BrandsRepository.default);

_tsyringe.container.registerSingleton('PurchasesRepository', _PurchasesRepository.default);

_tsyringe.container.registerSingleton('SalesRepository', _SalesRepository.default);

_tsyringe.container.registerSingleton('DashboardRepository', _DashboardRepository.default);