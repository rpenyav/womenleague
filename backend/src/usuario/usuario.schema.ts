// usuario/schemas/usuario.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Usuario {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  apellidos: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  fechaAlta: Date;

  @Prop({ default: 'basico' })
  nivel: 'basico' | 'premium';

  @Prop({ default: 'guest' })
  rol: 'admin' | 'guest';

  // Añadido ownedTeams como un array de ObjectIds
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Team' }] })
  ownedTeams: Types.ObjectId[];
}

export type UsuarioDocument = Usuario & Document;
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
