import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioExternoRespuesta } from './dto/respuesta-login.interface';
import { RolUsuario } from '../usuario/rol-usuario.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  loginUrl: string = 'https://natural-generosity-production-1a76.up.railway.app'

  constructor(
    private jwtService: JwtService,
    @InjectRepository(UsuarioEntity)
    private estudianteRepository: Repository<UsuarioEntity>,
  ) { }

  /**
   * Inicia sesión al usuario.
   *
   * @remarks
   * La autenticación se realiza a través del sistema de usuarios manejado
   * por Ravenclaw.
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

    const usuariobd = await this.estudianteRepository.findOneBy({
      rut: rut
    })

    const correo = usuariobd?.email;

    // Trae contraseña guardada
    let user: UsuarioEntity;
    try {
      user = await this.estudianteRepository.findOneByOrFail({
        email: correo
      })
    } catch (error: any) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const hashPass = user.password;
    const checkPass = await bcrypt.compare(pass, hashPass);
    if (!checkPass) {
      throw new ForbiddenException('Contraseña inválida');
    }

    // Login externo
    const respuesta = await fetch(this.loginUrl + '/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: correo,
        password: hashPass,
      })
    })

    const usuarioExterno = await respuesta.json();

    if (usuarioExterno.error) {
      throw new UnauthorizedException(usuarioExterno.message);
    }

    // Revisa si tienen el mismo UUID
    // if (!(usuarioExterno.uuid === user.ID_externo)) {
    //   throw new ConflictException('Sistema externo y local no sincronizados')
    // }

    const payload = {
      sub: user.ID_estudiante,
      correo: user.email,
      rol: user.rol,
    }

    // console.log(payload);
    // console.log(user);
    // console.log(user.rol === RolUsuario.Admin)
    // console.log(user.rol === RolUsuario.Estudiante)

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
   * Devuelve un token JWT para autenticar sistemas externos. Tiene una duración
   * de 60 segundos.
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

  // /**
  //  * Obtiene un token de un sistema dado. Utilizado para los pagos y el manejo
  //  * de usuarios.
  //  *
  //  * @param url La url del endpoint del sistema
  //  * @param key La llave privada del sistema
  //  * @returns El token de la petición
  //  */
  // async fetchToken(url: string, key: string): Promise<string> {
  //   const respuesta = await fetch(url, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       privateKey: key
  //     })
  //   });

  //   const data = await respuesta.json();
  //   return data.access_token;
  // }
}
