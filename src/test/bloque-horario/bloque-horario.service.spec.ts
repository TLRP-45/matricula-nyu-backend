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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const bloque = (
    hora: string | Date | number,
    duracion: number,
  ): BloqueHorarioEntity =>
    ({
      hora,
      duracion,
    }) as BloqueHorarioEntity;

  describe('detectarChoques', () => {
    it('debería retornar false cuando no hay choques', () => {
      const horarios = [
        bloque('08:00', 90),
        bloque('09:30', 90),
        bloque('11:00', 60),
      ];

      expect(service.detectarChoques(horarios)).toBe(false);
    });

    it('debería retornar true cuando hay choque', () => {
      const horarios = [
        bloque('08:00', 90),
        bloque('09:00', 90),
      ];

      expect(service.detectarChoques(horarios)).toBe(true);
    });

    it('no debería considerar choque cuando un bloque termina exactamente al iniciar otro', () => {
      const horarios = [
        bloque('08:00', 60),
        bloque('09:00', 60),
      ];

      expect(service.detectarChoques(horarios)).toBe(false);
    });
  });

  describe('validarHorario', () => {
    it('no debería lanzar excepción si no hay choques', () => {
      const horarios = [
        bloque('08:00', 60),
        bloque('09:00', 60),
      ];

      expect(() => service.validarHorario(horarios)).not.toThrow();
    });

    it('debería lanzar excepción si existe un choque', () => {
      const horarios = [
        bloque('08:00', 90),
        bloque('08:30', 60),
      ];

      expect(() => service.validarHorario(horarios)).toThrow(
        BadRequestException,
      );
    });
  });

  describe('toMinutes (indirectamente)', () => {
    it('debería aceptar horas tipo Date', () => {
      const fecha = new Date();
      fecha.setHours(8, 0, 0, 0);

      expect(
        service.detectarChoques([
          bloque(fecha, 60),
          bloque('09:00', 60),
        ]),
      ).toBe(false);
    });

    it('debería aceptar horas en minutos (number)', () => {
      expect(
        service.detectarChoques([
          bloque(480, 60),
          bloque(540, 60),
        ]),
      ).toBe(false);
    });

    it('debería lanzar excepción con formato de hora inválido', () => {
      expect(() =>
        service.detectarChoques([
          bloque('hola' as any, 60),
          bloque('09:00', 60),
        ]),
      ).toThrow(BadRequestException);
    });

    it('debería lanzar excepción con hora fuera de rango', () => {
      expect(() =>
        service.detectarChoques([
          bloque('25:00', 60),
          bloque('09:00', 60),
        ]),
      ).toThrow(BadRequestException);
    });

    it('debería lanzar excepción cuando la hora es null', () => {
      expect(() =>
        service.detectarChoques([
          bloque(null as any, 60),
          bloque('09:00', 60),
        ]),
      ).toThrow(BadRequestException);
    });
  });
});