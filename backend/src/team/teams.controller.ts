import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './teams.schema';
import { JwtAuthGuard } from 'src/jwt-guard';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ teams: Team[]; hasMore: boolean }> {
    const result = await this.teamsService.findAllWithPagination(page, limit);
    return result;
  }

  @Get('players/:id')
  @UseGuards(JwtAuthGuard)
  async findOneWithPlayers(@Param('id') id: string) {
    const teamWithPlayers = await this.teamsService.findOneWithPlayers(id);
    return teamWithPlayers;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTeamDto: Team): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string): Promise<Team | null> {
    return this.teamsService.findOne(id);
  }
}
