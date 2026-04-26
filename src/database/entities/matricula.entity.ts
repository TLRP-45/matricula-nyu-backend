import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Carrera } from "./carrera.entity";

@Entity({ name: 'matricula' })
export class Matricula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  activa: boolean;

  @ManyToOne(() => Carrera, (carrera) => carrera.matriculas)
  carrera: Carrera
}
