import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { OfertaEntity } from "../oferta/oferta.entity";

@Entity('Profesores')
export class ProfesorEntity{
    @PrimaryGeneratedColumn()
    ID_profesor!: number;

    @Column({ length: 100 })
    nombre!: string;

    @Column({ length: 100 })
    apellido!: string;

    @Column({ unique: true })
    email!: string;

    @OneToMany(() => OfertaEntity, (of) => of.profesor,
    {nullable: true,})
    clases!: OfertaEntity[];
}