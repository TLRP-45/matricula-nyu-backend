import { AppDataSource } from '../../config/typeorm.config';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(CarreraEntity);

  const carreras: Partial<CarreraEntity>[] = [
    {
      nombre: 'Agronomía',
      facultad: 'Ciencias agronómicas',
    },
    {
      nombre: 'Ingeniería civil en computación e informática',
      facultad: 'Ingeniería',
    },
  ];

  await repo.save(carreras);

  console.log('🌱 Seed carrera ejecutado');

  await AppDataSource.destroy();
}

seed();