import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { KEY_PUBLICA } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  /*
   * Este método es el necesario de implementar para que el guard haga los
   * chequeos necesarios a las rutas. Revisa si la ruta es pública (se
   * puede acceder a ella sin autenticación), y si no, revisa si existe un
   * token válido de autorización en el header de la request.
   *
   * Dado que nuestro sistema necesita login para todo, es un guard global.
   */
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    // Revisa si es una ruta pública (el decorador Public() añade metadata)
    const esPublico = this.reflector.getAllAndOverride<boolean>(KEY_PUBLICA, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (esPublico) {
      return true;
    }

    // Revisa si hay un token de autenticación (usuario loggeado)
    const request = context.switchToHttp().getRequest();
    const token = this.extraerTokenEnHeader(request);
    if (!token) {
      throw new UnauthorizedException('Nope');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  /**
   * Función auxiliar para extraer el token del header.
   *
   * @param request - La solicitud de HTTP
   * @returns El token de autorización
   */
  private extraerTokenEnHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
