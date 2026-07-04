import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { EstudianteService } from '../../modules/usuario/usuario.service';
import { Public } from '../auth/public.decorator';
import { RegistroUsuarioDTO } from './dto/registro.dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolUsuario } from './rol-usuario.enum';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(RolUsuario.Admin)
@Controller('usuario')
export class UsuarioController {

  constructor(
    private readonly estudianteService: EstudianteService
  ) { }

  @Public()
  @Post('registro')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: RegistroUsuarioDTO })
  async registrar(@Body() usuario: RegistroUsuarioDTO) {
    return this.estudianteService.registrar(usuario);
  }

  // @Public()
  // @Post('registro-test')
  // async registroTest(@Body() usuario: {
  //   nombre: string,
  //   apellido: string,
  //   correo: string,
  //   pass: string,
  // }) {
  //   return this.estudianteService.testRegistro(usuario.nombre, usuario.apellido,
  //     usuario.correo, usuario.pass);
  // }
}
