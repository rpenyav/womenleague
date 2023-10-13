import { Player } from "./player";

export interface Team {
  team: any;
  _id?: string;
  team_name?: string;
  formal_name?: string;
  location_city?: string;
  year_foundation?: string;
  shield_image?: string;
  actually_squad_image?: string;
  first_wear_image?: string;
  second_wear_image?: string;
  league?: League;
  stadium?: Stadium;
  slug?: string;
  technical_staff?: TechnicalStaff[];
  players?: Player[];
  palmares?: Palmares[];
}

export interface Palmares {
  titulo: string;
  temporada: string;
}

export interface League {
  identify?: string;
  name?: Name;
}

export enum Name {
  LaLigaIberdrola = "La Liga Iberdrola",
  The1ARFEF = "1a RFEF",
}

export interface Stadium {
  name?: string;
  capacity?: string;
  address?: string;
  image?: string;
}

export interface TechnicalStaff {
  name?: string;
  appointment?: Appointment;
  image?: string;
}

export enum Appointment {
  CoachManager = "Coach Manager",
}
