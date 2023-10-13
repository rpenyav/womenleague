import { Player } from "./player";
import { Team } from "./team";
import { Usuario } from "./usuario";

export interface Owner {
  usuario?: Usuario;
  teams?: Team[];
  players?: Player[];
}
