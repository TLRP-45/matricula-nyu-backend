import {
  Body,
  Controller,
  Get,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
  Post,
} from '@nestjs/common';

import {
    ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';


import { EstudianteService } from './usuario.service';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { EstadoToma } from './estado-toma.enum';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolUsuario } from './rol-usuario.enum';
import { Public } from '../auth/public.decorator';
import { RegistroUsuarioDTO } from './dto/registro.dto';

export class CambiarEstadoTomaDTO {
  @ApiProperty({
    enum: EstadoToma,
    example: EstadoToma.APROBADO,
    description: 'Nuevo estado de la toma de oferta',
  })
  @IsEnum(EstadoToma)
  estado!: EstadoToma;
}

@ApiBearerAuth()
@UseGuards(RolesGuard)
@ApiTags('Usuario')
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


  @Patch('toma/:id/estado')
  @Roles(RolUsuario.Admin)
  @ApiOperation({
    summary: 'Cambiar el estado de una toma de oferta',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la toma de oferta',
    example: 15,
  })
  @ApiBody({
    type: CambiarEstadoTomaDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'La toma de oferta no existe.',
  })
  cambiarEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CambiarEstadoTomaDTO,
  ) {
    return this.estudianteService.cambiarEstado(
      id,
      dto.estado,
    );
  }

  @Get(':id/comprobante')
  async obtenerComprobante(
    @Param('id') id: string,
  ) {
    return this.estudianteService.generarComprobante(+id);
  }
}
