export interface Usuario {
  _id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
  fechaAlta?: Date;
  nivel?: "basico" | "premium";
  rol?: "admin" | "guest";
  ownedTeams?: string[];
}
