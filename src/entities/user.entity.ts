import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({
    type:"uuid"
  })
  id: string;

  @Column({
    unique:true
  })
  email: string

  @Column({
    nullable:true
  })
  firstName: string;

  @Column({
    nullable:true
  })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}