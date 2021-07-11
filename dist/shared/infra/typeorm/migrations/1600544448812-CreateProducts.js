"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateProducts1600544448812 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'products',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'user_id',
        type: 'uuid'
      }, {
        name: 'brand_id',
        type: 'uuid'
      }, {
        name: 'title',
        type: 'varchar'
      }, {
        name: 'nick',
        type: 'varchar',
        length: '45'
      }, {
        name: 'description',
        type: 'text'
      }, {
        name: 'image',
        type: 'text',
        isNullable: true
      }, {
        name: 'price',
        type: 'decimal',
        precision: 9,
        scale: 2
      }, {
        name: 'sale_price',
        type: 'decimal',
        precision: 9,
        scale: 2
      }, {
        name: 'trash',
        type: 'integer',
        default: 0
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [new _typeorm.TableForeignKey({
        name: 'ProductUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }), new _typeorm.TableForeignKey({
        name: 'ProductBrand',
        columnNames: ['brand_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brands',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('products', 'ProductUser');
    await queryRunner.dropForeignKey('products', 'ProductBrand');
    await queryRunner.dropTable('products');
  }

}

exports.default = CreateProducts1600544448812;