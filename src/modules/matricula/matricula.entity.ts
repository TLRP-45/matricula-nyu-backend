import { Entity, Index, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { EstudianteEntity } from '../estudiante/estudiante.entity';
import { CarreraEntity } from '../carrera/carrera.entity';

@Entity()
export class MatriculaEntity {
     @PrimaryGeneratedColumn({ unsigned: true })
    ID_matricula!: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @Column({ default: true })
    arancel_aldia!: boolean;

    @Index()
    @ManyToOne(() => EstudianteEntity, (est) => est.matriculas,
    {nullable: false})
    @JoinColumn({name: 'ID_estudiante'})
    estudiante!: EstudianteEntity;

    @Index()
    @ManyToOne(() => CarreraEntity, (est) => est.matriculados,
    {nullable: false})
    @JoinColumn({name: 'ID_carrera'})
    carrera!: CarreraEntity;

    @Column({ type: 'smallint' })
    semestre!: number;

    @Column({ default: 'activa' })
    estado!: string;
}