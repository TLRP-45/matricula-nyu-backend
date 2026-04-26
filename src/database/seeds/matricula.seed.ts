import { AppDataSource } from '../../config/typeorm.config';
import { MatriculaEntity } from '../../modules/matricula/matricula.entity';
import { EstudianteEntity } from '../../modules/estudiante/estudiante.entity';
import { CarreraEntity } from '../../modules/carrera/carrera.entity';

async function seed() {
  await AppDataSource.initialize();

  const matriculaRepo = AppDataSource.getRepository(MatriculaEntity);
  const estudianteRepo = AppDataSource.getRepository(EstudianteEntity);
  const carreraRepo = AppDataSource.getRepository(CarreraEntity);

  const estudiante1 = await estudianteRepo.findOneBy({ ID_estudiante: 1 });
  const estudiante2 = await estudianteRepo.findOneBy({ ID_estudiante: 2 });

  const carrera1 = await carreraRepo.findOneBy({ id_carrera: 1 });
  const carrera2 = await carreraRepo.findOneBy({ id_carrera: 2 });

  if (!estudiante1 || !estudiante2 || !carrera1 || !carrera2) {
    throw new Error('❌ Faltan estudiantes o carreras para crear matrículas');
  }

  const matriculas: Partial<MatriculaEntity>[] = [
    {
      estudiante: estudiante1,
      carrera: carrera1,
      arancel_aldia: true,
    },
    {
      estudiante: estudiante2,
      carrera: carrera1,
      arancel_aldia: false,
    },
    {
      estudiante: estudiante1,
      carrera: carrera2,
      arancel_aldia: true,
    },
  ];

  await matriculaRepo.save(matriculas);

  console.log('🌱 Seed matriculas ejecutado');

  await AppDataSource.destroy();
}

seed();