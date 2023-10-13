import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Patch,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './players.schema';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAllWithPagination(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ players: Player[]; hasMore: boolean }> {
    return this.playersService.findAllWithPagination(page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Player> {
    return this.playersService.findOne(id);
  }

  @Post()
  create(@Body() createPlayerDto: Player): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @Get('by-team/:teamId')
  findByTeam(@Param('teamId') teamId: string): Promise<Player[]> {
    return this.playersService.findByTeam(teamId);
  }

  @Get('with-team/:id')
  async findOneWithTeam(@Param('id') id: string) {
    const playerWithTeam = await this.playersService.findOneWithTeam(id);
    return playerWithTeam;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFields: Partial<Player>,
  ): Promise<Player> {
    return this.playersService.updatePlayer(id, updateFields);
  }
}
