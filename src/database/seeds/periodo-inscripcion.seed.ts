import { AppDataSource } from '../../config/typeorm.config';
import { PeriodoInscripcionEntity } from '../../modules/periodo-inscripcion/preiodo-inscripcion.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(PeriodoInscripcionEntity);

  const periodos: Partial<PeriodoInscripcionEntity>[] = [
    {
      inicio: new Date('2026-03-01T00:00:00'),
      final: new Date('2026-06-30T23:59:59'),
    },
    {
      inicio: new Date('2026-08-01T00:00:00'),
      final: new Date('2026-11-30T23:59:59'),
    },
  ];

  await repo.save(periodos);

  console.log('🌱 Seed periodo de inscripción ejecutado');

  await AppDataSource.destroy();
}

seed();