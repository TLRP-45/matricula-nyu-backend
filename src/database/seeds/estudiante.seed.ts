import { AppDataSource } from '../../config/typeorm.config';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';

async function seed() {
  await AppDataSource.initialize();

  const repo = AppDataSource.getRepository(UsuarioEntity);

  const estudiantes: Partial<UsuarioEntity>[] = [
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      email: 'juan@test.com',
      rut: '11111111-1',
      nacionalidad: 'Chilena',
      sexo: 'M',
      nacimiento: new Date('2000-05-15T00:00:00'),
      direccion: 'Av. Siempre Viva 123',
      telefono: '987654321',
      activo: true,
    },
    {
      nombre: 'Ana',
      apellido: 'Gómez',
      email: 'ana@test.com',
      rut: '22222222-2',
      nacionalidad: 'Chilena',
      sexo: 'F',
      nacimiento: new Date('2001-08-20T00:00:00'),
      direccion: 'Calle Falsa 456',
      telefono: '912345678',
      activo: true,
    },
  ];

  await repo.upsert(estudiantes, ['email']);

  console.log('🌱 Seed estudiantes ejecutado');

  await AppDataSource.destroy();
}

seed();
