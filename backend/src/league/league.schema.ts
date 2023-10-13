import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Partido, PartidoSchema } from './partido.schema';

@Schema()
export class Liga extends Document {
  @Prop()
  nombreDeLaLiga: string;

  @Prop()
  temporada: string;

  @Prop({ type: [PartidoSchema] })
  partidos: Partido[];
  @Prop([
    {
      usuarioId: String,
      equipoId: String,
    },
  ])
  usuariosEquipos: Array<{ usuarioId: string; equipoId: string }>;
}

export const LigaSchema = SchemaFactory.createForClass(Liga);
