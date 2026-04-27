import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PlazoMatricula {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  inicio!: Date

  @Column()
  fin!: Date
}
