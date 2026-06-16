import { Test, TestingModule } from '@nestjs/testing';
import { DesincripcionService } from '../../services/desincripcion/desincripcion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';
import { OfertaEntity } from '../../modules/oferta/oferta.entity';
import { PeriodoInscripcionService } from '../../modules/periodo-inscripcion/periodo-inscripcion.service';
import { EstudianteTomaOfertaEntity } from '../../modules/usuario/estudiante-toma-oferta.entity';

describe('DesincripcionService', () => {
  let service: DesincripcionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: DesincripcionService, useValue: {}},
        {provide: getRepositoryToken(UsuarioEntity), useValue: {}},
        {provide: getRepositoryToken(OfertaEntity), useValue: {}},
        {provide: PeriodoInscripcionService, useValue: {}},
        {provide: getRepositoryToken(EstudianteTomaOfertaEntity), useValue: {}}
      ],
    }).compile();

    service = module.get<DesincripcionService>(DesincripcionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
