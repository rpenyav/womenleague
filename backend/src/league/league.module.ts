import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Liga, LigaSchema } from './league.schema';
import { Partido, PartidoSchema } from './partido.schema'; // Importar el esquema de Match
import { LigaController } from './league.controller';
import { LigaService } from './league.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';
import { TeamsModule } from '../team/teams.module';

@Module({
  imports: [
    CloudinaryModule,
    TeamsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Liga', schema: LigaSchema },
      { name: 'Partido', schema: PartidoSchema }, // Añadir el esquema de Match aquí
    ]), // Actualizar esto para incluir ambos esquemas
  ],
  controllers: [LigaController],
  providers: [LigaService, CloudinaryService],
})
export class LigaModule {}
