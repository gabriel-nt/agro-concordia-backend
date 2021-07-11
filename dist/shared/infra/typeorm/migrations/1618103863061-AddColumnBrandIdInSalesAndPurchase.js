"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddColumnBrandIdInSalesAndPurchase1618103863061 {
  async up(queryRunner) {
    await queryRunner.addColumn('sales', new _typeorm.TableColumn({
      name: 'brand_id',
      type: 'uuid',
      default: null,
      isNullable: true
    }));
    await queryRunner.addColumn('purchases', new _typeorm.TableColumn({
      name: 'brand_id',
      type: 'uuid',
      default: null,
      isNullable: true
    }));
    await queryRunner.createForeignKey('sales', new _typeorm.TableForeignKey({
      name: 'SalesBrand',
      columnNames: ['brand_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'brands',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('purchases', new _typeorm.TableForeignKey({
      name: 'PurchasesBrand',
      columnNames: ['brand_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'brands',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('sales', 'brand_id');
    await queryRunner.dropForeignKey('purchases', 'brand_id');
    await queryRunner.dropColumn('sales', 'brand_id');
    await queryRunner.dropColumn('purchases', 'brand_id');
  }

}

exports.default = AddColumnBrandIdInSalesAndPurchase1618103863061;