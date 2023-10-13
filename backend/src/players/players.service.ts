import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Player, PlayerDocument } from './players.schema';
import { Team } from '../team/teams.schema';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
    @InjectModel(Team.name) private teamModel: Model<Team>,
  ) {}

  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ players: Player[]; hasMore: boolean }> {
    // Calcula el número de documentos a omitir antes de comenzar a devolver resultados.
    const skip = (page - 1) * limit;

    // Consultamos 'limit + 1' registros para determinar si hay más páginas.
    const players = await this.playerModel
      .find()
      .skip(skip)
      .limit(limit + 1)
      .exec();

    // Determina si hay más páginas.
    const hasMore = players.length > limit;

    // Devuelve solo 'limit' registros y el indicador 'hasMore'.
    return {
      players: players.slice(0, limit),
      hasMore: hasMore,
    };
  }

  async findOne(id: string): Promise<Player | null> {
    return this.playerModel.findById(id).exec();
  }

  async create(createPlayerDto: Player): Promise<Player> {
    const createdPlayer = new this.playerModel(createPlayerDto);
    return createdPlayer.save();
  }

  async findByTeam(teamId: string): Promise<Player[]> {
    return this.playerModel.find({ team_id: teamId }).exec();
  }

  async findOneWithTeam(id: string) {
    const player = await this.playerModel.findById(id).exec();

    if (!player) {
      throw new NotFoundException('Jugadora no encontrada');
    }

    const team = await this.teamModel
      .findById(player.team_id)
      .select('team_name formal_name shield_image') // Selecciona las propiedades del equipo que deseas mostrar
      .exec();

    if (!team) {
      throw new NotFoundException('Equipo no encontrado');
    }
    const playerWithTeam = {
      player,
      team,
    };

    return playerWithTeam;
  }

  async updatePlayer(
    id: string,
    updateFields: Partial<Player>,
  ): Promise<Player> {
    const updatedPlayer = await this.playerModel
      .findOneAndUpdate(
        { _id: id }, // encuentra el documento con este id
        updateFields, // actualiza estos campos
        { new: true }, // devuelve el documento actualizado
      )
      .exec();

    if (!updatedPlayer) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }

    return updatedPlayer;
  }
}
