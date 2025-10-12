import { v4 as uuid } from "uuid";
import { arenas } from "../../repositories/arena_repository";

export class CreateArena {
  constructor() {}
  public execute(nome: string, zona: string, endereco?: string, geolocalizacao?: string) {
    const newArena = { id: uuid(), nome, zona, endereco, geolocalizacao };
    arenas.push(newArena);
    return newArena;
  }
}
