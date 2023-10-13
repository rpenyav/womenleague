import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserTeam, UserTeamDocument } from './user-team.schema';

@Injectable()
export class UserTeamService {
  constructor(
    @InjectModel(UserTeam.name) private userTeamModel: Model<UserTeamDocument>,
  ) {}

  async create(userTeamData: Partial<UserTeam>): Promise<UserTeam> {
    // Comprobar si el usuario ya ha seleccionado este equipo específico
    const existingSpecificUserTeam = await this.userTeamModel
      .findOne({
        userId: userTeamData.userId,
        teamId: userTeamData.teamId,
      })
      .exec();

    if (existingSpecificUserTeam) {
      throw new ConflictException('Ya has seleccionado este equipo');
    }

    // Comprobar si el usuario ya está asociado con algún equipo
    const existingGeneralUserTeam = await this.userTeamModel
      .findOne({
        userId: userTeamData.userId,
      })
      .exec();

    if (existingGeneralUserTeam) {
      throw new ConflictException('Ya estás asociado con un equipo');
    }

    const createdUserTeam = new this.userTeamModel(userTeamData);
    return createdUserTeam.save();
  }

  async findAll(): Promise<UserTeam[]> {
    return this.userTeamModel.find().exec();
  }

  async findByUserId(userId: string): Promise<UserTeam | null> {
    return this.userTeamModel.findOne({ userId }).exec();
  }

  async findByTeamId(teamId: string): Promise<UserTeam[]> {
    return this.userTeamModel.find({ teamId }).exec();
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.userTeamModel.deleteMany({ userId }).exec();
  }

  async deleteByTeamId(teamId: string): Promise<void> {
    await this.userTeamModel.deleteMany({ teamId }).exec();
  }
}
