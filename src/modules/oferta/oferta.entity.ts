import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OfertaEntity{

    @PrimaryGeneratedColumn()
    id_imparte!: number;

    @Column({ length: 100 })
    tipo!: string;

    @Column({ length: 100 })
    grupo!: string;

    @Column()
    cupos!: number;
}