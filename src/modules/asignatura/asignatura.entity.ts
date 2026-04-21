import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { OfertaEntity } from "../oferta/oferta.entity";
import { CarreraTieneAsignaturaEntity } from "../carrera/carrera-tiene-asignatura.entity";

@Entity('Asignaturas')
export class AsignaturaEntity{
    @PrimaryGeneratedColumn()
    ID_asignatura!: number;

    @Column({ length: 100})
    nombre!: string;

    @Column()
    creditos!: number;

    @ManyToMany(() => AsignaturaEntity, (asig) => asig.esPrerequisitoDe,
    {nullable: true,})
    @JoinTable()
    prerrequisitos!: AsignaturaEntity[];

    @ManyToMany(() => AsignaturaEntity, (asig) => asig.prerrequisitos,
    {nullable: true,})
    esPrerequisitoDe!: AsignaturaEntity[];

    @OneToMany(() => OfertaEntity, (of) => of.asignatura,
    {nullable: true,})
    ofertas!: OfertaEntity[];

    @OneToMany(() => CarreraTieneAsignaturaEntity, (en) => en.asignatura,
    {nullable: false,})
    es_de!: CarreraTieneAsignaturaEntity[];
}