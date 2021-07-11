import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddColumnBrandIdInSalesAndPurchase1618103863061
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sales',
      new TableColumn({
        name: 'brand_id',
        type: 'uuid',
        default: null,
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'purchases',
      new TableColumn({
        name: 'brand_id',
        type: 'uuid',
        default: null,
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        name: 'SalesBrand',
        columnNames: ['brand_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brands',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'purchases',
      new TableForeignKey({
        name: 'PurchasesBrand',
        columnNames: ['brand_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'brands',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sales', 'brand_id');
    await queryRunner.dropForeignKey('purchases', 'brand_id');

    await queryRunner.dropColumn('sales', 'brand_id');
    await queryRunner.dropColumn('purchases', 'brand_id');
  }
}
