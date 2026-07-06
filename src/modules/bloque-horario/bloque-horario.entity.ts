import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, Check } from "typeorm";
import { OfertaEntity } from "../oferta/oferta.entity";

@Entity('bloque_horario_entity')
@Check(`hora IS NOT NULL`)
@Check(`duracion > 0 AND duracion <= 24`)
export class BloqueHorarioEntity{

    @PrimaryGeneratedColumn({ unsigned: true })
    ID_horario!: number;

    @Index()
    @Column({ unsigned: true, nullable: false })
    ID_oferta!: number;

    @Column({ length: 20, nullable: false })
    dia!: string;

    @Column({ length: 100, nullable: false })
    lugar!: string;

    @Column({ length: 5, nullable: false })
    hora!: string;

    @Column()
    duracion!: number;

    @ManyToOne(() => OfertaEntity, (o) => o.horarios, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'ID_oferta' })
    oferta!: OfertaEntity;
}