import { AppDataSource } from '../../config/typeorm.config';
import { ProfesorEntity } from '../../modules/profesor/profesor.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(ProfesorEntity);

  const profesores: Partial<ProfesorEntity>[] = [
    {
      nombre: 'Miguel',
      apellido: 'Pérez',
      email: 'miguel@test.com',
    },
    {
      nombre: 'Maria',
      apellido: 'Gómez',
      email: 'maria@test.com',
    },
  ];

  await repo.upsert(profesores, ['email']);

  console.log('🌱 Seed profesor ejecutado');

  await AppDataSource.destroy();
}

seed();