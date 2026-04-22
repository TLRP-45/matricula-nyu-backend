import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, Check } from "typeorm";
import { OfertaEntity } from "../oferta/oferta.entity";

@Entity('Horario')
@Check(`hora IS NOT NULL`)
export class BloqueHorarioEntity{

    @PrimaryGeneratedColumn({ unsigned: true })
    ID_horario!: number;

    @Index()
    @Column({ unsigned: true, nullable: false })
    ID_oferta!: number;

    @Column({ length: 100, nullable: false })
    lugar!: string;

    @Column({ type: 'datetime', nullable: false })
    hora!: Date;

    @ManyToOne(() => OfertaEntity, (o) => o.horarios, {
        onDelete: 'CASCADE',
        nullable: false,
    })
    @JoinColumn({ name: 'ID_oferta' })
    oferta!: OfertaEntity;
}