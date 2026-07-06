import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { RegistroDTO } from './dto/registro.dto';

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
  async login(rut: string, pass: string): Promise<{ token: string, user: any }> {
    // TODO: Integrar con el sistema de usuarios
    const user = await this.estudianteRepository.findOneBy({ rut: rut })

    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.ID_estudiante,
      rut: user.rut,
      rol: user.rol,
    }

    return {
      token: await this.jwtService.signAsync(
        payload, { expiresIn: '2h' }),
      user: {
        id: user.ID_estudiante,
        rut: user.rut,
        nombre: user.nombre,
        rol: user.rol,
      }
    }
  }

  /**
   * Devuelve un token JWT para autenticar sistemas externos.
   *
   * @param privateKey La llave privada del sistema
   * @returns Token JWT activo
   *
   * @throws UnauthorizedException
   * Excepción si la llave privada no es correcta
   */
  async getToken(privateKey: string): Promise<{ token: string }> {
    let payload: { sub: string };
    switch (privateKey) {
      case process.env.ALOJAMIENTO_PK:
        payload = { sub: 'ALOJAMIENTO' };
        break;
      case process.env.BIBLIOTECA_PK:
        payload = { sub: 'BIBLIOTECA' };
        break;
      case process.env.CAFETERIA_PK:
        payload = { sub: 'CAFETERIA' };
        break;
      default:
        throw new UnauthorizedException('Llave privada incorrecta')
    }
    return {
      token: await this.jwtService.signAsync(
        payload, { expiresIn: '60s' }),
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
