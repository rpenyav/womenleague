export interface Player {
  _id?: string;
  name?: string;
  slug?: string;
  birthday?: string;
  position?: string;
  position_abbreviate?: PositionAbbreviate;
  nationality?: string;
  dorsal?: string;
  image?: string;
  team_id?: string;
  titular: boolean;
  lesion: boolean;
  expulsada: boolean;
}

export enum PositionAbbreviate {
  Df = "DF",
  Dm = "DM",
  Fw = "FW",
  Gk = "GK",
  MF = "MF",
}
