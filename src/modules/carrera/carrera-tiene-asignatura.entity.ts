import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarreraEntity } from "./carrera.entity";
import { AsignaturaEntity } from "../asignatura/asignatura.entity";

@Entity()
export class CarreraTieneAsignaturaEntity{
    @PrimaryGeneratedColumn()
    ID_toma!: number;

    @ManyToOne(() => CarreraEntity, (car) => car.tiene,
    {nullable: false})
    @JoinColumn({name: 'ID_carrera'})
    carrera!: CarreraEntity;

    @ManyToOne(() => AsignaturaEntity, (asig) => asig.es_de,
    {nullable: false})
    @JoinColumn({name: 'ID_asignatura'})
    asignatura!: AsignaturaEntity;

    @Column()
    semestre!: number;

    @Column()
    posicion!: number;
}