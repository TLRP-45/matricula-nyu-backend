import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Check, DeleteDateColumn } from "typeorm";
import { OfertaEntity } from "../oferta/oferta.entity";

@Entity('periodo_inscripcion')
@Check(`inicio <= final`)
export class PeriodoInscripcionEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    ID_periodo!: number;

    @Column({ type: 'datetime', nullable: false })
    inicio!: Date;

    @Column({ type: 'datetime', nullable: false })
    final!: Date;

    @OneToMany(() => OfertaEntity, (of) => of.periodo_inscripcion, {
        nullable: true,
    })
    ofertas!: OfertaEntity[];

    @DeleteDateColumn({
        nullable: true,
        name: 'deleted_at',
    })
    deletedAt?: Date;
}