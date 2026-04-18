import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'matricula' })
export class Matricula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;
}
