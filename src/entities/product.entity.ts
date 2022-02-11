import { 
  Entity, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {Category} from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    nullable:true,
    type:"varchar",
    length:255
  })
  name: string;

  @Column({
    default:0,
    type:"float"
  })
  price: number;

  @ManyToOne(type => Category, category => category.products)
  @JoinColumn()
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}