import { EstudianteEntity } from '../../modules/estudiante/estudiante.entity';
import { AppDataSource } from '../../config/typeorm.config';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(AsignaturaEntity);

  const asignaturas: Partial<AsignaturaEntity>[] = [
    {
      nombre: 'CC223-SISTEMAS DE INFORMACION',
      creditos: 5,
    },
    {
      nombre: 'CC219-TALLER DE APLICACIONES WEB',
      creditos: 5,
    },
  ];

  await repo.save(asignaturas);

  console.log('🌱 Seed asignaturas ejecutado');
  await AppDataSource.destroy();
}

seed();