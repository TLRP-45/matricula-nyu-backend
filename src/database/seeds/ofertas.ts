import { AppDataSource } from '../../config/typeorm.config';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { ProfesorEntity } from '../../modules/profesor/profesor.entity';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(OfertaEntity);
  const profesorRepo = AppDataSource.getRepository(ProfesorEntity);
const asignaturaRepo = AppDataSource.getRepository(AsignaturaEntity);

  const profesor = await profesorRepo.findOneBy({ ID_profesor: 1 });
  const asignatura = await asignaturaRepo.findOneBy({ ID_asignatura: 2 });

  if (!profesor || !asignatura) {
    throw new Error('Datos no encontrados');
    }

  const oferta: Partial<OfertaEntity>[] = [
    {
      tipo: 'C',
      grupo: 'A',
      cupos: 25,
      profesor: profesor!,
      asignatura: asignatura!
    },
    {
      tipo: 'T',
      grupo: 'B',
      cupos: 15,
      profesor: profesor!,
      asignatura: asignatura!
    },
  ];

  await repo.save(oferta);

  console.log('🌱 Seed oferta ejecutado');
  await AppDataSource.destroy();
}

seed();