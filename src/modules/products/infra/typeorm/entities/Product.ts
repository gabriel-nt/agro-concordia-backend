import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';

import Brand from '@modules/brands/infra/typeorm/entities/Brand';
import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import { Transform } from 'class-transformer';
import ProductStock from './ProductStock';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'brand_id' })
  brandId: string;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToOne(() => ProductStock)
  @JoinColumn({ referencedColumnName: 'productId', name: 'id' })
  productStock: ProductStock;

  @Column()
  title: string;

  @Column()
  nick: string;

  @Column()
  description: string;

  @Column()
  @Transform(({ value }) =>
    value ? `${process.env.APP_API_URL}files/${value}` : null,
  )
  image: string;

  @Column('decimal')
  price: number;

  @Column({
    type: 'decimal',
    name: 'sale_price',
  })
  salePrice: number;

  @OneToMany(() => Sale, sale => sale.product)
  sales: Sale[];

  @Column('integer')
  trash: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
