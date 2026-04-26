import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('asignatura')
export class Asignatura {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  horario: string;

  @Column()
  cuposDisponibles: number;
}