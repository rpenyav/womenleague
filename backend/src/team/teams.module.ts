import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './teams.schema';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { PlayersModule } from '../players/players.module';
import { PlayerSchema } from '../players/players.schema';

@Module({
  imports: [
    CloudinaryModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    PlayersModule,
    MongooseModule.forFeature([
      { name: 'Team', schema: TeamSchema },
      { name: 'Player', schema: PlayerSchema },
    ]),
  ],
  controllers: [TeamsController],
  providers: [TeamsService, CloudinaryService],
  exports: [TeamsService],
})
export class TeamsModule {}
