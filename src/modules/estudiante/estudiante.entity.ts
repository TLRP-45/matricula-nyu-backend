import { Check, Entity, Index, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';

@Entity()
@Check(`char_length(nombre) >= 2`)
@Check(`char_length(apellido) >= 2`)
@Check(`nacimiento <= CURRENT_DATE`)
@Check(`sexo IN ('M','F','O')`)
export class EstudianteEntity {
     @PrimaryGeneratedColumn({ unsigned: true })
    ID_estudiante!: number;

    @Column({ length: 100, nullable: false })
    nombre!: string;

    @Column({ length: 100, nullable: false })
    apellido!: string;

    @Index({ unique: true })
    @Column({ length: 150, nullable: false })
    email!: string;

    @Column({ default: true })
    activo!: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;

    @OneToMany(
        () => EstudianteTomaOfertaEntity,
        (toma) => toma.estudiante,
        { nullable: false }
    )
    toma!: EstudianteTomaOfertaEntity[];

    @Index({ unique: true })
    @Column({ length: 12, nullable: false })
    rut!: string;

    @Column({ length: 100, nullable: false })
    nacionalidad!: string;

    @Column({ type: 'enum', enum: ['M', 'F', 'O'], nullable: false })
    sexo!: string;

    @Column({ type: 'date', nullable: false })
    nacimiento!: Date;

    @Column({ length: 150, nullable: false })
    direccion!: string;

    @Column({ length: 20, nullable: false })
    telefono!: string;
}

