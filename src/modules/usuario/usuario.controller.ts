import {Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolUsuario } from './rol-usuario.enum';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@Roles(RolUsuario.Admin)
@Controller('usuario')
export class UsuarioController {}
