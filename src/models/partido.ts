import { Team } from "./team";

interface Jugador {
  _id: string;
  nombre: string;
}

interface Local {
  equipo: string;
  team: Team;
  estado: string;
  titulares: Jugador[];
  suplentes: Jugador[];
}

interface Visitante {
  equipo: string;
  team: Team;
  estado: string;
  titulares: Jugador[];
  suplentes: Jugador[];
}

interface Partido {
  _id: string;
  fecha: Date;
  hora: string;
  disputado: boolean;
  local: Local;
  visitante: Visitante;
  localData: Local;
  visitanteData: Visitante;
}

export default Partido;
