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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiParam } from '@nestjs/swagger';
import { OfertaService } from './oferta.service';
import { CreateOfertaDTO } from '../../controllers/oferta/dto/create-oferta.dto';
import { UpdateOfertaDTO } from '../../controllers/oferta/dto/update-oferta.dto';

@ApiTags('Oferta')
@Controller('oferta')
export class OfertaController {
  constructor(private readonly ofertaService: OfertaService) {}

  @Post()
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
  @ApiOperation({ summary: 'Editar una oferta' })
  @ApiParam({ name: 'id', type: Number })
  editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateOfertaDTO,
  ) {
    return this.ofertaService.editarOferta(id, data);
  }
}