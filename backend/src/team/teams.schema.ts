import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Team {
  @Prop()
  team_name: string;

  @Prop()
  formal_name: string;

  @Prop()
  location_city: string;

  @Prop()
  year_foundation: string;

  @Prop()
  shield_image: string;

  @Prop()
  actually_squad_image: string;

  @Prop()
  first_wear_image: string;

  @Prop()
  second_wear_image: string;

  @Prop({
    type: {
      name: String,
      capacity: String,
      address: String,
      image: String,
    },
  })
  stadium: {
    name: string;
    capacity: string;
    address: string;
    image: string;
  };

  @Prop()
  slug: string;

  @Prop()
  technical_staff: {
    name: string;
    appointment: string;
    image: string;
  }[];

  @Prop({
    type: [
      {
        titulo: String,
        temporada: String,
      },
    ],
  })
  palmares: {
    titulo: string;
    temporada: string;
  }[];
}

export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
