"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreatePurchases1600551498976 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'purchases',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'product_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'quantity',
        type: 'integer',
        isNullable: true
      }, {
        name: 'price',
        type: 'decimal',
        precision: 9,
        scale: 2
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('purchases', new _typeorm.TableForeignKey({
      name: 'PurchasesProduct',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('purchases', 'PurchasesProduct');
    await queryRunner.dropTable('purchases');
  }

}

exports.default = CreatePurchases1600551498976;