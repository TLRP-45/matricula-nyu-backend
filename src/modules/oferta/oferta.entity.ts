import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Index, Check } from "typeorm";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { AsignaturaEntity } from "../asignatura/asignatura.entity";
import { EstudianteTomaOfertaEntity } from "../estudiante/estudiante-toma-oferta.entity";
import { BloqueHorarioEntity } from "../bloque-horario/bloque-horario.entity";

@Entity()
@Check(`cupos > 0`)
@Check(`hrs_semanales > 0`)
@Check(`char_length(grupo) > 0`)
@Check(`tipo IN ('C','T','L')`)
export class OfertaEntity{

    @PrimaryGeneratedColumn({ unsigned: true })
    ID_oferta!: number;

    @Column({ type: 'enum', enum: ['C', 'T', 'L'], nullable: false })
    tipo!: string;

    @Column({ length: 20, nullable: false })
    grupo!: string;

    @Column({ type: 'smallint', unsigned: true, nullable: false })
    cupos!: number;

    @Column({ type: 'smallint', unsigned: true, nullable: false })
    hrs_semanales!: number;

    @Index()
    @Column({ unsigned: true })
    ID_profesor!: number;

    @ManyToOne(() => ProfesorEntity, (prof) => prof.clases, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'ID_profesor' })
    profesor!: ProfesorEntity;

    @Index()
    @Column({ unsigned: true })
    ID_asignatura!: number;

    @ManyToOne(() => AsignaturaEntity, (asig) => asig.ofertas, {
        nullable: false,
        onDelete: 'RESTRICT',
    })
    @JoinColumn({ name: 'ID_asignatura' })
    asignatura!: AsignaturaEntity;

    @OneToMany(() => EstudianteTomaOfertaEntity, (toma) => toma.oferta, {
        nullable: true,
    })
    tomada!: EstudianteTomaOfertaEntity[];

    @OneToMany(() => BloqueHorarioEntity, (bh) => bh.oferta, {
        nullable: true,
    })
    horarios!: BloqueHorarioEntity[];
}