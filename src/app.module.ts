import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSourceOptions } from './config/typeorm.config';
import { CarreraModule } from './modules/carrera/carrera.module';
import { MatriculaModule } from './modules/matricula/matricula.module';

@Module({
  imports: [ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSourceOptions),
    ControllersModule,
    CarreraModule,
    MatriculaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}