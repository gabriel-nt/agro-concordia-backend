"use strict";

var _FakeDashboardRepository = _interopRequireDefault(require("../repositories/fakes/FakeDashboardRepository"));

var _ListProductPerBrandService = _interopRequireDefault(require("./ListProductPerBrandService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeDashboardRepository;
let listProductAndBrand;
describe('List products per brand', () => {
  beforeEach(() => {
    fakeDashboardRepository = new _FakeDashboardRepository.default();
    listProductAndBrand = new _ListProductPerBrandService.default(fakeDashboardRepository);
  });
  it('should be able to list products per brand', async () => {
    const response = await listProductAndBrand.execute();
    expect(response).toHaveLength(1);
  });
});