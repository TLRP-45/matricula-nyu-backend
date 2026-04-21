import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante/estudiante.entity';

@Module({
    imports:[
        TypeOrmModule.forFeature([EstudianteEntity])
    ],
    exports:[],
    providers:[]
})
export class DatabaseModule {}
