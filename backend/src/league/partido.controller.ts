import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { PartidoService } from './partido.service';
import { Partido } from './partido.schema';

@Controller('partido')
export class PartidoController {
  constructor(private readonly partidoService: PartidoService) {}

  @Get()
  async findAll(): Promise<Partido[]> {
    return this.partidoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const partido = await this.partidoService.findOne(id);
    if (!partido) {
      throw new NotFoundException('Partido no encontrado');
    }
    return partido;
  }

  @Post()
  async create(@Body() createPartidoDto: any) {
    return this.partidoService.create(createPartidoDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePartidoDto: any) {
    return this.partidoService.update(id, updatePartidoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.partidoService.delete(id);
  }
}
