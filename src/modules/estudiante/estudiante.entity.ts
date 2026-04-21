import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { EstudianteTomaOfertaEntity } from './estudiante-toma-oferta.entity';

@Entity('Estudiantes')
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    ID_estudiante!: number;

    @Column({ length: 100 })
    nombre!: string;

    @Column({ length: 100 })
    apellido!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ default: false })
    activo!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => EstudianteTomaOfertaEntity, (toma) => toma.estudiante,
    {nullable: false,})
    toma!: EstudianteTomaOfertaEntity[];
}

