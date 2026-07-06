import {
  Controller,
  Post,
  Body,
  Patch,
  Put,
  ParseIntPipe,
  Param,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { OfertaService } from './oferta.service';
import { CreateOfertaDTO } from './dto/create-oferta.dto';
import { UpdateOfertaDTO } from './dto/update-oferta.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { RolUsuario } from '../usuario/rol-usuario.enum';

@ApiTags('Oferta')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('oferta')
export class OfertaController {
  constructor(private readonly ofertaService: OfertaService) { }

  @Post()
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Crear una nueva oferta' })
  crear(@Body() body: CreateOfertaDTO) {
    return this.ofertaService.crearOferta(body);
  }

  //@Patch(':id')
  //editar(
  //@Param('id') id: number,
  //@Body() body: UpdateOfertaDTO
  //) {
  //return this.ofertaService.editarOferta(Number(id), body);
  //}

  @Patch(':id/publicar')
  @ApiOperation({ summary: 'Publicar una oferta' })
  @ApiParam({ name: 'id', type: Number })
  publicar(@Param('id') id: number) {
    return this.ofertaService.publicarOferta(Number(id));
  }

  @Get()
  @ApiOperation({ summary: 'Obtener ofertas publicadas' })
  @ApiQuery({ name: 'carreraId', required: true, type: Number })
  @ApiQuery({ name: 'periodoId', required: true, type: Number })
  obtener(
    @Query('carreraId') carreraId: number,
    @Query('periodoId') periodoId: number,
  ) {
    return this.ofertaService.obtenerPublicadas(
      Number(carreraId),
      Number(periodoId),
    );
  }

  @Put(':id')
  @Roles(RolUsuario.Admin)
  @ApiOperation({ summary: 'Editar una oferta' })
  @ApiParam({ name: 'id', type: Number })
  editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateOfertaDTO,
  ) {
    return this.ofertaService.editarOferta(id, data);
  }
}
