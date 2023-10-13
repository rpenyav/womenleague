import Partido from "./partido";

export interface Liga {
  _id: string;
  nombreDeLaLiga: string;
  temporada: string;
  partidos: Partido[];
  usuariosEquipos: Array<{ usuarioId: string; equipoId: string }>;
}

export interface LigaYPartidos {
  liga: Partial<Liga>;
  partidos: Partido[];
}
