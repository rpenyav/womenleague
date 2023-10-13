import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class UserTeam {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Equipo', required: true, unique: true })
  teamId: Types.ObjectId;
}

export type UserTeamDocument = UserTeam & Document;
export const UserTeamSchema = SchemaFactory.createForClass(UserTeam);
