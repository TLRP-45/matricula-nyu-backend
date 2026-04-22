import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable, Check } from "typeorm";
import { OfertaEntity } from "../oferta/oferta.entity";
import { CarreraTieneAsignaturaEntity } from "../carrera/carrera-tiene-asignatura.entity";

@Entity('Asignaturas')
@Check(`creditos > 0`)
@Check(`hrs_presenciales >= 0`)
@Check(`hrs_autonomo >= 0`)
export class AsignaturaEntity{

    @PrimaryGeneratedColumn({ unsigned: true })
    ID_asignatura!: number;

    @Column({ length: 100, nullable: false })
    nombre!: string;

    @Column({ type: 'tinyint', unsigned: true, nullable: false })
    creditos!: number;

    @Column({ length: 100, nullable: false })
    caracter!: string;

    @Column({ type: 'smallint', unsigned: true, nullable: false })
    hrs_presenciales!: number;

    @Column({ type: 'smallint', unsigned: true, nullable: false })
    hrs_autonomo!: number;

    // Relación autoreferenciada: asignatura → prerrequisitos
    @ManyToMany(() => AsignaturaEntity, (asig) => asig.esPrerequisitoDe, {
        nullable: true,
    })
    @JoinTable()
    prerrequisitos!: AsignaturaEntity[];

    @ManyToMany(() => AsignaturaEntity, (asig) => asig.prerrequisitos, {
        nullable: true,
    })
    esPrerequisitoDe!: AsignaturaEntity[];

    @OneToMany(() => OfertaEntity, (of) => of.asignatura, {
        nullable: true,
    })
    ofertas!: OfertaEntity[];

    @OneToMany(() => CarreraTieneAsignaturaEntity, (en) => en.asignatura, {
        nullable: false,
    })
    es_de!: CarreraTieneAsignaturaEntity[];
}