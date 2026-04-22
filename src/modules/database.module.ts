import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity';
import { AsignaturaEntity } from './asignatura/asignatura.entity';
import { CarreraEntity } from './carrera/carrera.entity';
import { OfertaEntity } from './oferta/oferta.entity';
import { ProfesorEntity } from './profesor/profesor.entity';
import { BloqueHorarioModule } from './bloque-horario/bloque-horario.module';
import { PeriodoInscripcionModule } from './periodo-inscripcion/periodo-inscripcion.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([EstudianteEntity]),
        TypeOrmModule.forFeature([AsignaturaEntity]),
        TypeOrmModule.forFeature([CarreraEntity]),
        TypeOrmModule.forFeature([OfertaEntity]),
        TypeOrmModule.forFeature([ProfesorEntity]),
        BloqueHorarioModule,
        PeriodoInscripcionModule,
    ],
    exports:[],
    providers:[]
})
export class DatabaseModule {}
