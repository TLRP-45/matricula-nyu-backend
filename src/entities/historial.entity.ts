import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('historial')
export class Historial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estudianteId: number;

  @Column()
  asignaturaId: number;

  @Column()
  aprobado: boolean;
}