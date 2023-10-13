import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class Local {
  @Prop({ type: Types.ObjectId, ref: 'Team' })
  equipo: Types.ObjectId;

  @Prop()
  estado: string;

  @Prop([
    {
      _id: { type: Types.ObjectId, ref: 'Jugadora' },
      nombre: { type: String },
    },
  ])
  titulares: Array<{ _id: Types.ObjectId; nombre: string }>;

  @Prop([
    {
      _id: { type: Types.ObjectId, ref: 'Jugadora' },
      nombre: { type: String },
    },
  ])
  suplentes: Array<{ _id: Types.ObjectId; nombre: string }>;
}

@Schema()
class Visitante {
  @Prop({ type: Types.ObjectId, ref: 'Team' })
  equipo: Types.ObjectId;

  @Prop()
  estado: string;

  @Prop([
    {
      _id: { type: Types.ObjectId, ref: 'Jugadora' },
      nombre: { type: String },
    },
  ])
  titulares: Array<{ _id: Types.ObjectId; nombre: string }>;

  @Prop([
    {
      _id: { type: Types.ObjectId, ref: 'Jugadora' },
      nombre: { type: String },
    },
  ])
  suplentes: Array<{ _id: Types.ObjectId; nombre: string }>;
}

@Schema()
export class Partido extends Document {
  @Prop()
  fecha: Date;

  @Prop()
  hora: string;

  @Prop()
  disputado: boolean;

  @Prop({ type: Local })
  local: Local;

  @Prop({ type: Visitante })
  visitante: Visitante;
}

export const PartidoSchema = SchemaFactory.createForClass(Partido);
