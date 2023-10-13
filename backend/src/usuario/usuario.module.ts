import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from './usuario.schema';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { PlayersModule } from '../players/players.module';
import { PlayerSchema } from '../players/players.schema';
import { TeamsModule } from 'src/team/teams.module';
import { Team, TeamSchema } from 'src/team/teams.schema';

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
      { name: 'Usuario', schema: UsuarioSchema },
      { name: 'Player', schema: PlayerSchema },
      { name: Team.name, schema: TeamSchema },
    ]),
    TeamsModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, CloudinaryService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
