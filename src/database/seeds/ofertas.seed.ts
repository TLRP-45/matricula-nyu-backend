import { AppDataSource } from '../../config/typeorm.config';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { ProfesorEntity } from '../../modules/profesor/profesor.entity';
import { AsignaturaEntity } from '../../modules/asignatura/asignatura.entity';
import { PeriodoInscripcionEntity } from '../../modules/periodo-inscripcion/preiodo-inscripcion.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(OfertaEntity);
  const profesorRepo = AppDataSource.getRepository(ProfesorEntity);
  const asignaturaRepo = AppDataSource.getRepository(AsignaturaEntity);
  const periodoRepo = AppDataSource.getRepository(PeriodoInscripcionEntity);

  const profesor = await profesorRepo.findOneBy({ ID_profesor: 1 });
  const asignatura = await asignaturaRepo.findOneBy({ ID_asignatura: 2 });
  const periodo = await periodoRepo.findOneBy({ ID_periodo: 1 });

  if (!profesor || !asignatura || !periodo) {
    throw new Error('❌ Faltan datos: profesor, asignatura o periodo');
  }

  const ofertas: Partial<OfertaEntity>[] = [
    {
      tipo: 'C',
      grupo: 'A',
      cupos: 25,
      hrs_semanales: 4,
      profesor,
      asignatura,
      periodo_inscripcion: periodo,
    },
    {
      tipo: 'T',
      grupo: 'B',
      cupos: 15,
      hrs_semanales: 2,
      profesor,
      asignatura,
      periodo_inscripcion: periodo,
    },
  ];

  await repo.save(ofertas);

  console.log('🌱 Seed oferta ejecutado');

  await AppDataSource.destroy();
}

seed();