import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../modules/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioEntity } from '../../modules/usuario/usuario.entity';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: AuthService, useValue: {}},
        {provide: getRepositoryToken(UsuarioEntity), useValue: {}},
        {provide: JwtService, useValue: {}}
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
