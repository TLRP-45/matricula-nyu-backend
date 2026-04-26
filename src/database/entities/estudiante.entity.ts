import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;
}
