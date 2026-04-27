import { AppDataSource } from '../../config/typeorm.config';
import { PlazoMatricula } from '../../modules/plazo-matricula/plazo-matricula.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(PlazoMatricula);

  const plazos: Partial<PlazoMatricula>[] = [
    {
      inicio: new Date('2026-03-01T00:00:00'),
      fin: new Date('2026-03-15T23:59:59'),
    },
    {
      inicio: new Date('2026-08-01T00:00:00'),
      fin: new Date('2026-08-15T23:59:59'),
    },
  ];

  await repo.save(plazos);

  console.log('🌱 Seed plazo matrícula ejecutado');

  await AppDataSource.destroy();
}

seed();