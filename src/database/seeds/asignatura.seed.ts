import { AppDataSource } from '../../config/typeorm.config';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(AsignaturaEntity);

  const asignaturas: Partial<AsignaturaEntity>[] = [
    {
      nombre: 'CC223-SISTEMAS DE INFORMACION',
      creditos: 5,
      caracter: 'OBLIGATORIA',
      hrs_presenciales: 4,
      hrs_autonomo: 6,
    },
    {
      nombre: 'CC219-TALLER DE APLICACIONES WEB',
      creditos: 5,
      caracter: 'OBLIGATORIA',
      hrs_presenciales: 4,
      hrs_autonomo: 6,
    },
  ];

  await repo.save(asignaturas);

  console.log('🌱 Seed asignaturas ejecutado');

  await AppDataSource.destroy();
}

seed();