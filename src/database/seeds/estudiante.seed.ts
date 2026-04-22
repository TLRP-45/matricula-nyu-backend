import { DataSource } from 'typeorm';
import { EstudianteEntity } from '../../modules/estudiante/estudiante.entity';
import { AppDataSource } from '../../config/typeorm.config';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(EstudianteEntity);

  const estudiantes: Partial<EstudianteEntity>[] = [
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@test.com',
    },
    {
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'ana@test.com',
    },
  ];

  await repo.save(estudiantes);

  console.log('🌱 Seed estudiantes ejecutado');
  await AppDataSource.destroy();
}

seed();