import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        length: 100
    })
    name: string;

    @Column()
    email: string

    @Column()
    birthDate: string

    @Column()
    password: string
}