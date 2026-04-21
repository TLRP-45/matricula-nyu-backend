import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfesorEntity{
    @PrimaryGeneratedColumn()
    ID_profesor!: number;

    @Column({ length: 100 })
    nombre!: string;

    @Column({ length: 100 })
    apellido!: string;

    @Column({ unique: true })
    email!: string;
}