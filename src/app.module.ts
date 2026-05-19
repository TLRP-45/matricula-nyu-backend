import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSourceOptions } from './config/typeorm.config';
import { CarreraModule } from './modules/carrera/carrera.module';
import { MatriculaModule } from './modules/matricula/matricula.module';
import { AuthModule } from './modules/auth/auth.module';
import { AsignaturaModule } from './modules/asignatura/asignatura.module';
import { BloqueHorarioModule } from './modules/bloque-horario/bloque-horario.module';
import { EstudianteModule } from './modules/estudiante/estudiante.module';
import { OfertaModule } from './modules/oferta/oferta.module';
import { PeriodoInscripcionModule } from './modules/periodo-inscripcion/periodo-inscripcion.module';
import { PlazoMatriculaModule } from './modules/plazo-matricula/plazo-matricula.module';
import { ProfesorModule } from './modules/profesor/profesor.module';

import { OfertaModule } from './modules/oferta/oferta.module';
@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSourceOptions),
    ControllersModule,
    AsignaturaModule,
    BloqueHorarioModule,
    CarreraModule,
    EstudianteModule,
    MatriculaModule,
    AuthModule,
    OfertaModule,
    OfertaModule,
    PeriodoInscripcionModule,
    PlazoMatriculaModule,
    ProfesorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}