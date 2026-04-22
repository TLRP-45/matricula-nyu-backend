import { AppDataSource } from '../../config/typeorm.config';
import { ProfesorEntity } from '../../modules/profesor/profesor.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(ProfesorEntity);

  const profesor: Partial<ProfesorEntity>[] = [
    {
      nombre: 'Miguel',
      apellido: 'Pérez',
      email: 'Miguel@test.com',
    },
    {
      nombre: 'Maria',
      apellido: 'Gómez',
      email: 'Maria@test.com',
    },
  ];

  await repo.save(profesor);

  console.log('🌱 Seed profesor ejecutado');
  await AppDataSource.destroy();
}

seed();