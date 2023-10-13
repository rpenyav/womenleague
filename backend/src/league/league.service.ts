// liga.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Liga } from './league.schema';
import { Partido } from './partido.schema';
import { Team } from '../team/teams.schema';

@Injectable()
export class LigaService {
  constructor(
    @InjectModel(Liga.name) private readonly ligaModel: Model<Liga>,
  ) {}

  async findAll(): Promise<Liga[]> {
    return this.ligaModel.find().exec();
  }

  async findAllPartidos(): Promise<any> {
    // puedes definir un tipo más específico que "any" si lo prefieres
    const ligas = await this.ligaModel.find().exec();
    let allPartidos = [];

    for (const liga of ligas) {
      allPartidos = [...allPartidos, ...liga.partidos];
    }

    return allPartidos;
  }

  async findPartidoById(ligaId: string, partidoId: string): Promise<any> {
    // puedes definir un tipo más específico que "any" si lo prefieres
    const liga = await this.ligaModel.findById(ligaId).exec();
    if (!liga || !liga.partidos) {
      return null;
    }

    const partido = liga.partidos.find((p) => p._id.toString() === partidoId);
    return partido || null;
  }

  async findPartidosByLigaId(ligaId: string): Promise<any> {
    // puedes definir un tipo más específico que "any" si lo prefieres
    const liga = await this.ligaModel.findById(ligaId).exec();
    return liga ? liga.partidos : [];
  }

  async findPartidosUltimaLiga(): Promise<{
    liga: Partial<Liga>;
    partidos: Partido[];
  }> {
    const liga = await this.ligaModel
      .find()
      .sort({ createdAt: -1 })
      .limit(1)
      .then((ligas) => ligas[0] || null);

    if (!liga) {
      return null;
    }

    // Ordenamos los partidos por su fecha de forma ascendente.
    const partidosOrdenados = liga.partidos.sort((a, b) => {
      const fechaA = new Date(a.fecha);
      const fechaB = new Date(b.fecha);
      return fechaA.getTime() - fechaB.getTime();
    });

    return {
      liga: {
        _id: liga._id,
        nombreDeLaLiga: liga.nombreDeLaLiga,
        temporada: liga.temporada,
        // añade aquí otros campos que quieras
      },
      partidos: partidosOrdenados,
    };
  }

  async findUltimaLiga(): Promise<Liga | null> {
    return await this.ligaModel
      .find()
      .sort({ createdAt: -1 }) // Ordenar por el campo "createdAt" en orden descendente
      .limit(1) // Limitar a solo 1 resultado
      .then((ligas) => ligas[0] || null); // Retorna la primera liga o null si no hay ninguna
  }

  async updatePartido(
    ligaId: string,
    partidoId: string,
    updateData: any,
  ): Promise<any> {
    // puedes definir un tipo más específico que "any" si lo prefieres para "updateData"
    const liga = await this.ligaModel.findById(ligaId).exec();
    if (!liga || !liga.partidos) {
      return null;
    }

    const partidoIndex = liga.partidos.findIndex(
      (p) => p._id.toString() === partidoId,
    );
    if (partidoIndex === -1) {
      return null;
    }

    // Aquí asumimos que "updateData" contiene las propiedades del partido que quieres modificar
    Object.assign(liga.partidos[partidoIndex], updateData);

    await liga.save();
    return liga.partidos[partidoIndex];
  }

  async create(createLigaDto: Liga): Promise<Liga> {
    const createdLiga = new this.ligaModel(createLigaDto);
    return createdLiga.save();
  }

  async update(id: string, updateLigaDto: any): Promise<Liga> {
    return this.ligaModel.findByIdAndUpdate(id, updateLigaDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    return this.ligaModel.findByIdAndDelete(id);
  }

  // Métodos adicionales para manejar los partidos
  async addPartido(ligaId: string, partido: any): Promise<Liga> {
    return this.ligaModel.findByIdAndUpdate(
      ligaId,
      { $push: { partidos: partido } },
      { new: true },
    );
  }

  async addPartidoToLiga(ligaId: string, nuevoPartido: any): Promise<any> {
    // puedes definir un tipo más específico que "any" para "nuevoPartido" si lo prefieres
    const liga = await this.ligaModel.findById(ligaId).exec();
    if (!liga) {
      return null;
    }

    // Aquí asumimos que "nuevoPartido" contiene todas las propiedades necesarias para crear un nuevo partido
    liga.partidos.push(nuevoPartido);

    await liga.save();
    return nuevoPartido;
  }

  async findLigasByUserId(userId: string): Promise<Liga[]> {
    return await this.ligaModel
      .find({ 'usuariosEquipos.usuarioId': userId })
      .exec();
  }

  async findLigaById(id: string): Promise<Liga> {
    const liga = await this.ligaModel.findById(id).exec();
    if (!liga) {
      throw new NotFoundException(`Liga con ID ${id} no encontrada`);
    }
    return liga;
  }

  async actualizarAlineacion(
    idLiga: string,
    idPartido: string,
    alineacionLocal: any,
    alineacionVisitante: any,
  ): Promise<Liga> {
    // Buscar la liga por ID
    const liga = await this.ligaModel.findById(idLiga).exec();

    // Encontrar el partido específico dentro de la liga
    const partidoIndex = liga.partidos.findIndex(
      (partido) => partido._id.toString() === idPartido,
    );

    if (partidoIndex === -1) {
      throw new Error('Partido no encontrado');
    }

    // Actualizar las alineaciones
    liga.partidos[partidoIndex].local.titulares = alineacionLocal.titulares;
    liga.partidos[partidoIndex].local.suplentes = alineacionLocal.suplentes;
    liga.partidos[partidoIndex].visitante.titulares =
      alineacionVisitante.titulares;
    liga.partidos[partidoIndex].visitante.suplentes =
      alineacionVisitante.suplentes;

    // Guardar los cambios en la base de datos
    return await liga.save();
  }
}
