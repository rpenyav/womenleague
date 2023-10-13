import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from './teams.schema';
import { Player, PlayerDocument } from '../players/players.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    @InjectModel(Player.name) private playerModel: Model<PlayerDocument>,
  ) {}

  async findAllWithPagination(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ teams: any[]; hasMore: boolean }> {
    const skip = (page - 1) * limit;
    const teams = await this.teamModel
      .find()
      .skip(skip)
      .limit(limit + 1)
      .exec();
    const hasMore = teams.length > limit;

    // Obtener los IDs de los equipos
    const teamIds = teams.map((team) => team._id);

    // Consultar los jugadores asociados a estos equipos
    const playerPromises = teamIds.map((id) => {
      return this.playerModel.find({ team_id: id }).exec();
    });

    const playersForEachTeam = await Promise.all(playerPromises);

    // Combinar los resultados de equipos y jugadores
    const teamsWithPlayers = teams.slice(0, limit).map((team, index) => {
      const teamObject = team.toObject();
      return {
        ...teamObject,
        players: playersForEachTeam[index],
      };
    });

    return {
      teams: teamsWithPlayers,
      hasMore: hasMore,
    };
  }

  async findOne(id: string): Promise<Team | null> {
    return this.teamModel.findById(id).exec();
  }

  async create(createTeamDto: Team): Promise<Team> {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findOneWithPlayers(id: string) {
    const team = await this.teamModel.findById(id).exec();
    if (!team) {
      throw new NotFoundException('Equipo no encontrado');
    }

    // Ahora, puedes obtener las jugadoras del equipo
    const players = await this.playerModel // Utilizar el modelo de jugadores
      .find({ team_id: id }) // Filtrar por el ID del equipo
      //   .select('name slug') // Seleccionar las propiedades que deseas mostrar
      .exec();

    return { team, players };
  }
}
