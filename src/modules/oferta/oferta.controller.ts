import {Controller,Post,Body,Patch,Put,ParseIntPipe,Param,Get,Query} from '@nestjs/common';

import { OfertaService } from './oferta.service';
import { CreateOfertaDTO } from '../../controllers/oferta/dto/create-oferta.dto';
import { UpdateOfertaDTO } from '../../controllers/oferta/dto/update-oferta.dto';

@Controller('oferta')
export class OfertaController {

  constructor(private readonly ofertaService: OfertaService) {}

  @Post()
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
  publicar(@Param('id') id: number) {
    return this.ofertaService.publicarOferta(Number(id));
  }

  @Get()
  obtener(
    @Query('carreraId') carreraId: number,
    @Query('periodoId') periodoId: number
  ) {
    return this.ofertaService.obtenerPublicadas(
      Number(carreraId),
      Number(periodoId)
    );
  }
  @Put(':id')
  editar(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateOfertaDTO
  ) {
    return this.ofertaService.editarOferta(id, data);
  }
}