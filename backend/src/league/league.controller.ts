import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { LigaService } from './league.service';
import { Liga } from './league.schema';
import { Partido } from './partido.schema';

@Controller('liga')
export class LigaController {
  constructor(private readonly ligaService: LigaService) {}

  @Get()
  async findAll() {
    return this.ligaService.findAll();
  }

  @Get('partidos')
  async findAllPartidos(): Promise<any> {
    // puedes definir un tipo más específico que "any" si lo prefieres
    return this.ligaService.findAllPartidos();
  }
  @Get('ultima/partidos')
  async findPartidosUltimaLiga(): Promise<{
    liga: Partial<Liga>;
    partidos: Partido[];
  } | null> {
    return await this.ligaService.findPartidosUltimaLiga();
  }
  @Get(':ligaId/partidos')
  async findPartidosByLigaId(@Param('ligaId') ligaId: string): Promise<any> {
    // puedes definir un tipo más específico que "any" si lo prefieres
    return this.ligaService.findPartidosByLigaId(ligaId);
  }

  @Get('ultima')
  async findUltimaLiga(): Promise<Liga | null> {
    return await this.ligaService.findUltimaLiga();
  }

  @Post(':ligaId/partidos')
  async addPartidoToLiga(
    @Param('ligaId') ligaId: string,
    @Body() nuevoPartido: any,
  ): Promise<any> {
    // puedes definir un tipo más específico que "any" para "nuevoPartido" si lo prefieres
    return this.ligaService.addPartidoToLiga(ligaId, nuevoPartido);
  }

  // LigasController

  @Get(':ligaId/partidos/:partidoId')
  async findPartidoById(
    @Param('ligaId') ligaId: string,
    @Param('partidoId') partidoId: string,
  ): Promise<any> {
    // puedes definir un tipo más específico que "any" si lo prefieres
    return this.ligaService.findPartidoById(ligaId, partidoId);
  }

  @Put(':ligaId/partidos/:partidoId')
  async updatePartido(
    @Param('ligaId') ligaId: string,
    @Param('partidoId') partidoId: string,
    @Body() updateData: any,
  ): Promise<any> {
    // puedes definir un tipo más específico que "any" si lo prefieres para "updateData"
    return this.ligaService.updatePartido(ligaId, partidoId, updateData);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const liga = await this.ligaService.findLigaById(id); // Usando el nuevo servicio
      return liga;
    } catch (e) {
      throw new NotFoundException(`Liga con ID ${id} no encontrada`);
    }
  }

  @Post()
  async create(@Body() createLigaDto: any) {
    return this.ligaService.create(createLigaDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateLigaDto: any) {
    return this.ligaService.update(id, updateLigaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ligaService.delete(id);
  }

  // Métodos para manejar partidos
  @Post(':ligaId/partidos')
  async addPartido(@Param('ligaId') ligaId: string, @Body() partido: any) {
    return this.ligaService.addPartido(ligaId, partido);
  }

  @Get('usuario/:userId')
  async findLigasByUserId(@Param('userId') userId: string) {
    return this.ligaService.findLigasByUserId(userId);
  }

  @Patch(':idLiga/partidos/:idPartido/alineaciones')
  async actualizarAlineacion(
    @Param('idLiga') idLiga: string,
    @Param('idPartido') idPartido: string,
    @Body() alineaciones: { local: any; visitante: any },
  ) {
    try {
      const resultado = await this.ligaService.actualizarAlineacion(
        idLiga,
        idPartido,
        alineaciones.local,
        alineaciones.visitante,
      );
      return { mensaje: 'Alineación actualizada con éxito', resultado };
    } catch (error) {
      return { mensaje: 'Error al actualizar la alineación', error };
    }
  }
}
