import { 
  Entity, Column, CreateDateColumn, UpdateDateColumn, 
  PrimaryGeneratedColumn, OneToMany
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable:true,
    type:"varchar",
    length:255
  })
  name: string;

  @OneToMany(type => Product, product => product.category)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}