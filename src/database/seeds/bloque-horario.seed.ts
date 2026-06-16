import { AppDataSource } from '../../config/typeorm.config';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { BloqueHorarioEntity } from '../../modules/bloque-horario/bloque-horario.entity';

async function seed() {
  await AppDataSource.initialize();

  const horarioRepo = AppDataSource.getRepository(BloqueHorarioEntity);
  const ofertaRepo = AppDataSource.getRepository(OfertaEntity);

  const oferta1 = await ofertaRepo.findOneBy({ ID_oferta: 1 });
  const oferta2 = await ofertaRepo.findOneBy({ ID_oferta: 2 });

  if (!oferta1 || !oferta2) {
    console.log('❌ No existen ofertas necesarias para crear horarios');
    await AppDataSource.destroy();
    return;
  }

  const horarios: Partial<BloqueHorarioEntity>[] = [
    {
      dia: 'MARTES',
      lugar: 'Aula 101',
      hora: '12:00',
      duracion: 2,
      oferta: oferta1,
    },
    {
      dia: 'Miecoles',
      lugar: 'Laboratorio 2',
      hora: '10:00',
      duracion: 3,
      oferta: oferta1,
    },
    {
      dia: 'LUNES',
      lugar: 'Aula 202',
      hora: '08:00',
      duracion: 2,
      oferta: oferta2,
    },
  ];

  await horarioRepo.save(horarios);

  console.log('🌱 Seed horarios ejecutado');

  await AppDataSource.destroy();
}

seed();