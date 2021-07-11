import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';

@Entity('brands')
class Brand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  brand: string;

  @Column('text')
  @Transform(({ value }) =>
    value ? `${process.env.APP_API_URL}files/${value}` : null,
  )
  image: string;

  @Column({
    type: 'text',
    name: 'background_image',
  })
  @Transform(({ value }) =>
    value ? `${process.env.APP_API_URL}files/${value}` : null,
  )
  backgroundImage: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Brand;
