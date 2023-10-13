import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserTeamService } from './user-team.service';
import { UserTeam } from './user-team.schema';

@Controller('user-team')
export class UserTeamController {
  constructor(private readonly userTeamService: UserTeamService) {}

  @Post()
  async createUserTeam(
    @Body() userTeamData: Partial<UserTeam>,
  ): Promise<UserTeam> {
    return this.userTeamService.create(userTeamData);
  }

  @Get()
  async getAllUserTeams(): Promise<UserTeam[]> {
    return this.userTeamService.findAll();
  }

  @Get('user/:userId')
  async getUserTeams(
    @Param('userId') userId: string,
  ): Promise<UserTeam | null> {
    return this.userTeamService.findByUserId(userId);
  }

  @Get('team/:teamId')
  async getTeamUsers(@Param('teamId') teamId: string): Promise<UserTeam[]> {
    return this.userTeamService.findByTeamId(teamId);
  }

  @Delete('user/:userId')
  async deleteUserTeams(@Param('userId') userId: string): Promise<void> {
    return this.userTeamService.deleteByUserId(userId);
  }

  @Delete('team/:teamId')
  async deleteTeamUsers(@Param('teamId') teamId: string): Promise<void> {
    return this.userTeamService.deleteByTeamId(teamId);
  }
}
