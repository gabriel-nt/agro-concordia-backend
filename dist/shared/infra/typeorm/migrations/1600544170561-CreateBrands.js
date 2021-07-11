"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateBrands1600544170561 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'brands',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'brand',
        type: 'varchar'
      }, {
        name: 'image',
        type: 'text',
        isNullable: true
      }, {
        name: 'background_image',
        type: 'varchar',
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
  }

  async down(queryRunner) {
    await queryRunner.dropTable('brands');
  }

}

exports.default = CreateBrands1600544170561;