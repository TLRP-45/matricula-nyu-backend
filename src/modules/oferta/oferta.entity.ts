import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { ProfesorEntity } from "../profesor/profesor.entity";
import { AsignaturaEntity } from "../asignatura/asignatura.entity";
import { EstudianteTomaOfertaEntity } from "../estudiante/estudiante-toma-oferta.entity";

@Entity('OfertasAcademicas')
export class OfertaEntity{

    @PrimaryGeneratedColumn()
    ID_oferta!: number;

    @Column({ length: 100 })
    tipo!: string;

    @Column({ length: 100 })
    grupo!: string;

    @Column()
    cupos!: number;

    @ManyToOne(() => ProfesorEntity, (prof) => prof.clases,
    {nullable: false,})
    @JoinColumn({ name: 'ID_profesor' })
    profesor!: ProfesorEntity;

    @ManyToOne(() => AsignaturaEntity, (asig) => asig.ofertas,
    {nullable: false,})
    @JoinColumn({ name: 'ID_asignatura' })
    asignatura!: AsignaturaEntity;

    @OneToMany(() => EstudianteTomaOfertaEntity, (toma) => toma.estudiante,
    {nullable: true,})
    tomada!: EstudianteTomaOfertaEntity[];
}