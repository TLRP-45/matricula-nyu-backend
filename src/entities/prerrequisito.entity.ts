import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('prerrequisito')
export class Prerrequisito {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asignaturaId: number;

  @Column()
  requisitoId: number;
}