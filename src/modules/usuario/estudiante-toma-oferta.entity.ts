import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, DeleteDateColumn } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { OfertaEntity } from "../oferta/oferta.entity";
import { EstadoToma } from "./estado-toma.enum";

@Entity()
export class EstudianteTomaOfertaEntity{
    @PrimaryGeneratedColumn()
    ID_toma!: number;

    @ManyToOne(() => UsuarioEntity, (est) => est.toma,
    {nullable: false})
    @JoinColumn({name: 'ID_estudiante'})
    estudiante!: UsuarioEntity;

    @ManyToOne(() => OfertaEntity, (est) => est.tomada,
    {nullable: false})
    @JoinColumn({name: 'ID_oferta'})
    oferta!: OfertaEntity;

    @Column({
    type: 'enum',
    enum: EstadoToma,
    default: EstadoToma.INSCRITO,
    })
    estado!: EstadoToma;

    @Column({type: 'date'})
    inscrita!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}
