import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn()
    ID_estudiante!: number;

    @Column({ length: 100 })
    nombre!: string;

    @Column({ length: 100 })
    apellido!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ default: true })
    activo!: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

