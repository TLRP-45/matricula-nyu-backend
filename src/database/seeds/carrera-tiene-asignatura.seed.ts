import { AppDataSource } from '../../config/typeorm.config';
import { CarreraTieneAsignaturaEntity } from '../../modules/carrera/carrera-tiene-asignatura.entity';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(CarreraTieneAsignaturaEntity);
  const carreraRepo = AppDataSource.getRepository(CarreraEntity);
  const asignaturaRepo = AppDataSource.getRepository(AsignaturaEntity);

  const carrera = await carreraRepo.findOneBy({ id_carrera: 1 });
  const asignatura = await asignaturaRepo.findOneBy({ ID_asignatura: 1 });

  if (!carrera || !asignatura) {
    throw new Error('Faltan datos: carrera o asignatura');
  }

  const relaciones: Partial<CarreraTieneAsignaturaEntity>[] = [
    {
      carrera: carrera,
      asignatura: asignatura,
      semestre: 1,
      posicion: 1,
    },
    {
      carrera: carrera,
      asignatura: asignatura,
      semestre: 2,
      posicion: 2,
    },
  ];

  await repo.save(relaciones);

  console.log('🌱 Seed carrera-asignatura ejecutado');
  await AppDataSource.destroy();
}

seed();