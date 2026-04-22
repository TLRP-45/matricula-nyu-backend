import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstudianteEntity } from "./estudiante.entity";
import { OfertaEntity } from "../oferta/oferta.entity";

@Entity()
export class EstudianteTomaOfertaEntity{
    @PrimaryGeneratedColumn()
    ID_toma!: number;

    @ManyToOne(() => EstudianteEntity, (est) => est.toma,
    {nullable: false})
    @JoinTable({name: 'ID_estudiante'})
    estudiante!: EstudianteEntity;

    @ManyToOne(() => OfertaEntity, (est) => est.tomada,
    {nullable: false})
    @JoinTable({name: 'ID_oferta'})
    oferta!: OfertaEntity;

    @Column({length: 100})
    estado!: string;

    @Column({type: 'date'})
    inscrita!: Date;
}