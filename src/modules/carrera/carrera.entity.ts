import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { CarreraTieneAsignaturaEntity } from "./carrera-tiene-asignatura.entity";

@Entity('Carreras')
export class CarreraEntity{
    @PrimaryGeneratedColumn()
    id_carrera!: number;

    @Column({ length: 100})
    nombre!: string;

    @Column({ length: 100})
    facultad!: string

    @OneToMany(() => CarreraTieneAsignaturaEntity, (tiene) => tiene.carrera,
    {nullable: false,})
    tiene!: CarreraTieneAsignaturaEntity[];
}