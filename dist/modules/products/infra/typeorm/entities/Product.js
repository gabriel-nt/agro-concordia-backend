"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Brand = _interopRequireDefault(require("../../../../brands/infra/typeorm/entities/Brand"));

var _Sale = _interopRequireDefault(require("../../../../sales/infra/typeorm/entities/Sale"));

var _classTransformer = require("class-transformer");

var _ProductStock = _interopRequireDefault(require("./ProductStock"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Product = (_dec = (0, _typeorm.Entity)('products'), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)('uuid'), _dec3 = Reflect.metadata("design:type", String), _dec4 = (0, _typeorm.Column)({
  name: 'user_id'
}), _dec5 = Reflect.metadata("design:type", String), _dec6 = (0, _typeorm.Column)({
  name: 'brand_id'
}), _dec7 = Reflect.metadata("design:type", String), _dec8 = (0, _typeorm.ManyToOne)(() => _Brand.default), _dec9 = (0, _typeorm.JoinColumn)({
  name: 'brand_id'
}), _dec10 = Reflect.metadata("design:type", typeof _Brand.default === "undefined" ? Object : _Brand.default), _dec11 = (0, _typeorm.OneToOne)(() => _ProductStock.default), _dec12 = (0, _typeorm.JoinColumn)({
  referencedColumnName: 'productId',
  name: 'id'
}), _dec13 = Reflect.metadata("design:type", typeof _ProductStock.default === "undefined" ? Object : _ProductStock.default), _dec14 = (0, _typeorm.Column)(), _dec15 = Reflect.metadata("design:type", String), _dec16 = (0, _typeorm.Column)(), _dec17 = Reflect.metadata("design:type", String), _dec18 = (0, _typeorm.Column)(), _dec19 = Reflect.metadata("design:type", String), _dec20 = (0, _typeorm.Column)(), _dec21 = (0, _classTransformer.Transform)(({
  value
}) => value ? `${process.env.APP_API_URL}files/${value}` : null), _dec22 = Reflect.metadata("design:type", String), _dec23 = (0, _typeorm.Column)('decimal'), _dec24 = Reflect.metadata("design:type", Number), _dec25 = (0, _typeorm.Column)({
  type: 'decimal',
  name: 'sale_price'
}), _dec26 = Reflect.metadata("design:type", Number), _dec27 = (0, _typeorm.OneToMany)(() => _Sale.default, sale => sale.product), _dec28 = Reflect.metadata("design:type", Array), _dec29 = (0, _typeorm.Column)('integer'), _dec30 = Reflect.metadata("design:type", Number), _dec31 = (0, _typeorm.CreateDateColumn)(), _dec32 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec33 = (0, _typeorm.UpdateDateColumn)(), _dec34 = Reflect.metadata("design:type", typeof Date === "undefined" ? Object : Date), _dec(_class = (_class2 = class Product {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "userId", _descriptor2, this);

    _initializerDefineProperty(this, "brandId", _descriptor3, this);

    _initializerDefineProperty(this, "brand", _descriptor4, this);

    _initializerDefineProperty(this, "productStock", _descriptor5, this);

    _initializerDefineProperty(this, "title", _descriptor6, this);

    _initializerDefineProperty(this, "nick", _descriptor7, this);

    _initializerDefineProperty(this, "description", _descriptor8, this);

    _initializerDefineProperty(this, "image", _descriptor9, this);

    _initializerDefineProperty(this, "price", _descriptor10, this);

    _initializerDefineProperty(this, "salePrice", _descriptor11, this);

    _initializerDefineProperty(this, "sales", _descriptor12, this);

    _initializerDefineProperty(this, "trash", _descriptor13, this);

    _initializerDefineProperty(this, "created_at", _descriptor14, this);

    _initializerDefineProperty(this, "updated_at", _descriptor15, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2, _dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "userId", [_dec4, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "brandId", [_dec6, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "brand", [_dec8, _dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "productStock", [_dec11, _dec12, _dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec14, _dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "nick", [_dec16, _dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "description", [_dec18, _dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "image", [_dec20, _dec21, _dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "price", [_dec23, _dec24], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "salePrice", [_dec25, _dec26], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "sales", [_dec27, _dec28], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "trash", [_dec29, _dec30], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec31, _dec32], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "updated_at", [_dec33, _dec34], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
var _default = Product;
exports.default = _default;