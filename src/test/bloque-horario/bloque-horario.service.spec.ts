import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { BloqueHorarioService } from '../../modules/bloque-horario/bloque-horario.service';
import { BloqueHorarioEntity } from '../../modules/bloque-horario/bloque-horario.entity';

describe('BloqueHorarioService', () => {
  let service: BloqueHorarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BloqueHorarioService],
    }).compile();

    service = module.get<BloqueHorarioService>(BloqueHorarioService);
  });

  function bloque(hora: string, duracion: number): BloqueHorarioEntity {
    const b = new BloqueHorarioEntity();
    b.hora = new Date(`2000-01-01T${hora}:00`);
    b.duracion = duracion;
    return b;
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('detectarChoques', () => {
    it('debería retornar false cuando no existen horarios', () => {
      expect(service.detectarChoques([])).toBe(false);
    });

    it('debería retornar false con un solo bloque', () => {
      expect(
        service.detectarChoques([
          bloque('08:00', 90),
        ]),
      ).toBe(false);
    });

    it('debería retornar false cuando los bloques no chocan', () => {
      expect(
        service.detectarChoques([
          bloque('08:00', 60),
          bloque('09:00', 60),
        ]),
      ).toBe(false);
    });

    it('debería detectar choque entre dos bloques', () => {
      expect(
        service.detectarChoques([
          bloque('08:00', 90),
          bloque('09:00', 60),
        ]),
      ).toBe(true);
    });

    it('debería detectar choque cuando un bloque está contenido en otro', () => {
      expect(
        service.detectarChoques([
          bloque('08:00', 180),
          bloque('09:00', 60),
        ]),
      ).toBe(true);
    });

    it('no debería considerar choque cuando un bloque termina exactamente al comenzar el otro', () => {
      expect(
        service.detectarChoques([
          bloque('08:00', 60),
          bloque('09:00', 60),
        ]),
      ).toBe(false);
    });

    it('debería detectar choque entre varios bloques', () => {
      expect(
        service.detectarChoques([
          bloque('08:00', 60),
          bloque('09:30', 60),
          bloque('10:00', 60),
        ]),
      ).toBe(true);
    });
  });

  describe('validarHorario', () => {
    it('no debería lanzar excepción si no existen choques', () => {
      expect(() =>
        service.validarHorario([
          bloque('08:00', 60),
          bloque('09:00', 60),
          bloque('10:00', 60),
        ]),
      ).not.toThrow();
    });

    it('debería lanzar BadRequestException cuando existen choques', () => {
      expect(() =>
        service.validarHorario([
          bloque('08:00', 90),
          bloque('09:00', 60),
        ]),
      ).toThrow(BadRequestException);
    });

    it('debería lanzar el mensaje correcto', () => {
      expect(() =>
        service.validarHorario([
          bloque('08:00', 90),
          bloque('09:00', 60),
        ]),
      ).toThrow('Choque de horario detectado');
    });
  });
});