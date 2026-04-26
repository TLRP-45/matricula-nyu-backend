import { Injectable, BadRequestException } from '@nestjs/common';
import { BloqueHorarioEntity } from './bloque-horario.entity';

@Injectable()
export class BloqueHorarioService {

  private getFin(h: BloqueHorarioEntity): number {
    return this.toMinutes(h.hora) + h.duracion;
  }

  private hayChoque(a: BloqueHorarioEntity, b: BloqueHorarioEntity): boolean {
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
      throw new BadRequestException('Choque de horario detectado');
    }
  }

  private toMinutes(date: Date): number {
    return date.getHours() * 60 + date.getMinutes();
    }
}