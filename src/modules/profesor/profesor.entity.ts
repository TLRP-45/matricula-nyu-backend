import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Index, Check } from "typeorm";
import { OfertaEntity } from "../oferta/oferta.entity";

@Entity()
@Check(`char_length(nombre) >= 2`)
@Check(`char_length(apellido) >= 2`)
export class ProfesorEntity{

    @PrimaryGeneratedColumn({ unsigned: true })
    ID_profesor!: number;

    @Column({ length: 100, nullable: false })
    nombre!: string;

    @Column({ length: 100, nullable: false })
    apellido!: string;

    @Index({ unique: true })
    @Column({ length: 150, nullable: false })
    email!: string;

    @OneToMany(() => OfertaEntity, (of) => of.profesor, {
        nullable: true,
    })
    clases!: OfertaEntity[];
}