import { arenas } from "../../repositories/arena_repository";

export class GetAllArenasQuery {
  constructor() {}

  public execute(zona?: string): Arena[] {
    if (zona) {
      console.log("Zona fornecida:", zona); // Log para depuração

      const arenas_filtradas = arenas.filter((arena) => arena.zona === zona);

      console.log("Arenas filtradas:", arenas_filtradas); // Log para depuração

      return arenas_filtradas;
    }

    return arenas;
  }
}
