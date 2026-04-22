import { Column, Entity, PrimaryGeneratedColumn, OneToMany, Index, Check } from "typeorm";
import { CarreraTieneAsignaturaEntity } from "./carrera-tiene-asignatura.entity";

@Entity()
@Check(`char_length(nombre) >= 3`)
@Check(`char_length(facultad) >= 3`)
export class CarreraEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id_carrera!: number;

    @Index({ unique: true })
    @Column({ length: 100, nullable: false })
    nombre!: string;   // Normalmente no quieres dos carreras con el mismo nombre

    @Column({ length: 100, nullable: false })
    facultad!: string;

    @OneToMany(() => CarreraTieneAsignaturaEntity, (tiene) => tiene.carrera, {
        nullable: false,
    })
    tiene!: CarreraTieneAsignaturaEntity[];
}