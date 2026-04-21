import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllersModule } from './controllers/controllers.module';
import { EstudianteModule } from './modules/estudiante/estudiante.module';

@Module({
  imports: [ControllersModule,
    EstudianteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
