import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './players.schema';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { TeamSchema } from 'src/team/teams.schema';

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
    MongooseModule.forFeature([
      { name: 'Player', schema: PlayerSchema },
      { name: 'Team', schema: TeamSchema },
    ]),
  ],
  controllers: [PlayersController],
  providers: [PlayersService, CloudinaryService],
})
export class PlayersModule {}
