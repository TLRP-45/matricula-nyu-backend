import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'plazo-matricula' })
export class PlazoMatricula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inicio: Date

  @Column()
  fin: Date
}
