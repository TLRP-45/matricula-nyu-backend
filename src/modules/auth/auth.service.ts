import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../estudiante/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UsuarioEntity)
    private estudianteRepository: Repository<UsuarioEntity>,
  ) {}

  /**
   * Inicia sesión al usuario.
   *
   * @remarks
   * La autenticación se hace primero con la base de datos
   * local, y luego con el servicio de usuarios, manejado por Ravenclaw.
   *
   * @param rut - El rut del usuario
   * @param pass - La contraseña encriptada
   * @returns Token JWT autenticado
   *
   * @throws NotFoundException
   * Excepción si el rut no existe
   *
   * @throws UnauthorizedException
   * Excepción si la contraseña es incorrecta
   */
  async login(rut: string, pass: string): Promise<{ token: string }> {
    // TODO: Integrar con el sistema de usuarios
    const user = await this.estudianteRepository.findOneBy({ rut: rut })

    if (!user) {
      throw new NotFoundException();
    }

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.ID_estudiante, pass: user.rut }

    return {
      token: await this.jwtService.signAsync(payload),
    }
  }

  /**
   * Registra la información del usuario y crea su cuenta.
   *
   * @remarks
   * La existencia de la cuenta se revisa primero localmente y luego con el
   * sistema de usuarios, manejado por Ravenclaw.
   *
   * @param
   * @param
   * @returns
   */
   async registro() {}
}
