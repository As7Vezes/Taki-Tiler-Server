import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        length: 100,
        nullable: false
    })
    name: string;

    @Column({
      nullable: false
    })
    email: string

    @Column({
      nullable: false
    })
    birthDate: string

    @Column({
      nullable: false
    })
    password: string
}