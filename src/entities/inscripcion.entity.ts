import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('inscripcion')
export class Inscripcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estudianteId: number;

  @Column()
  asignaturaId: number;
}