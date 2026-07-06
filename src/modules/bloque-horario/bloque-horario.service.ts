import { Injectable, BadRequestException } from '@nestjs/common';
import { BloqueHorarioEntity } from './bloque-horario.entity';

@Injectable()
export class BloqueHorarioService {

  private getFin(h: BloqueHorarioEntity): number {
    return this.toMinutes(h.hora) + h.duracion;
  }

  private hayChoque(
    a: BloqueHorarioEntity,
    b: BloqueHorarioEntity,
  ): boolean {

    const inicioA = this.toMinutes(a.hora);
    const finA = this.getFin(a);

    const inicioB = this.toMinutes(b.hora);
    const finB = this.getFin(b);

    return inicioA < finB && finA > inicioB;
  }

  detectarChoques(horarios: BloqueHorarioEntity[]): boolean {

    for (let i = 0; i < horarios.length; i++) {

      for (let j = i + 1; j < horarios.length; j++) {

        if (this.hayChoque(horarios[i], horarios[j])) {
          return true;
        }
      }
    }

    return false;
  }

  validarHorario(horarios: BloqueHorarioEntity[]): void {

    if (this.detectarChoques(horarios)) {
      throw new BadRequestException(
        'Choque de horario detectado'
      );
    }
  }

  private toMinutes(hora: string | Date | number | null | undefined): number {
    if (hora == null) {
      throw new BadRequestException('Hora inválida');
    }

    if (hora instanceof Date) {
      return hora.getHours() * 60 + hora.getMinutes();
    }

    if (typeof hora === 'number') {
      return hora;
    }

    if (typeof hora === 'string') {
      const normalized = hora.trim();
      const match = normalized.match(/^(\d{1,2}):(\d{2})$/);

      if (!match) {
        throw new BadRequestException(`Hora inválida: ${hora}`);
      }

      const hours = Number(match[1]);
      const minutes = Number(match[2]);

      if (hours > 23 || minutes > 59) {
        throw new BadRequestException(`Hora inválida: ${hora}`);
      }

      return hours * 60 + minutes;
    }

    throw new BadRequestException(`Hora inválida: ${String(hora)}`);
  }
}