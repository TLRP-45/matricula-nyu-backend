import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AsignaturaEntity{
    @PrimaryGeneratedColumn()
    id_asignatura!: number;

    @Column({ length: 100})
    nombre!: string;

    @Column()
    creditos!: number;
}