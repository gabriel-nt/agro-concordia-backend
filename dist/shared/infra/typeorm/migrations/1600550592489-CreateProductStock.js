"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateProductStock1600550592489 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'product_stock',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'stock_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'product_id',
        type: 'uuid',
        isNullable: true
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
    await queryRunner.createForeignKeys('product_stock', [new _typeorm.TableForeignKey({
      name: 'Stock',
      columnNames: ['stock_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'stock',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }), new _typeorm.TableForeignKey({
      name: 'Product',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })]);
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('product_stock', 'Stock');
    await queryRunner.dropForeignKey('product_stock', 'Product');
    await queryRunner.dropTable('product_stock');
  }

}

exports.default = CreateProductStock1600550592489;