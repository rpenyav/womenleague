import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';

import { PlayersModule } from './players/players.module';
import { TeamsModule } from './team/teams.module';
import { UserTeamModule } from './user-team/user-team.module';
import { LigaModule } from './league/league.module';
import { PartidoModule } from './league/partido.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.production' }), // Movido arriba
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    UserTeamModule,
    LigaModule,
    PartidoModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log('Secret Key:', configService.get<string>('SECRET_KEY'));
        return {
          secret: configService.get<string>('SECRET_KEY'),
          signOptions: { expiresIn: '1h' },
        };
      },
      inject: [ConfigService],
    }),

    MongooseModule.forRootAsync({
      // Este sigue después de ConfigModule
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    CloudinaryModule,
    TeamsModule,
    PlayersModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
