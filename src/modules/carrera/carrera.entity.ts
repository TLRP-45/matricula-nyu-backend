import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class CarreraEntity{
    @PrimaryGeneratedColumn()
    id_carrera!: number;

    @Column({ length: 100})
    nombre!: string;

    @Column({ length: 100})
    facultad!: string
}