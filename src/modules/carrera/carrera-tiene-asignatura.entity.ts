import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarreraEntity } from "./carrera.entity";
import { AsignaturaEntity } from "../asignatura/asignatura.entity";

@Entity('RamosPorCarrera')
export class CarreraTieneAsignaturaEntity{
    @PrimaryGeneratedColumn()
    ID_toma!: number;

    @ManyToOne(() => CarreraEntity, (car) => car.tiene,
    {nullable: false})
    @JoinTable({name: 'ID_carrera'})
    carrera!: CarreraEntity;

    @ManyToOne(() => AsignaturaEntity, (asig) => asig.es_de,
    {nullable: false})
    @JoinTable({name: 'ID_asignatura'})
    asignatura!: AsignaturaEntity;

    @Column()
    semestre!: number;
}