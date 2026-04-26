import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Matricula } from "./matricula.entity";

@Entity({ name: 'carrera' })
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 100 })
  nombre: string;

  @Column("varchar", { length: 100 })
  facultad: string;

  @Column("int")
  duracion: number;

  @Column("int")
  cupos: number;

  @OneToMany(() => Matricula, (matricula) => matricula.carrera)
  matriculas: Matricula[]
}
