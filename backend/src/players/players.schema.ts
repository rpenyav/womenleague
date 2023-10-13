import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Player {
  @Prop()
  name: string;

  @Prop()
  slug: string;

  @Prop()
  birthday: string;

  @Prop()
  position: string;

  @Prop()
  position_abbreviate: string;

  @Prop()
  nationality: string;

  @Prop()
  dorsal: string;

  @Prop()
  titular: boolean;

  @Prop()
  lesion: boolean;

  @Prop()
  tarjetas: number;

  @Prop()
  expulsada: boolean;

  @Prop()
  image: string;

  @Prop()
  team_id: string; // Esto relaciona al jugador con su equipo
}

export type PlayerDocument = Player & Document;
export const PlayerSchema = SchemaFactory.createForClass(Player);
