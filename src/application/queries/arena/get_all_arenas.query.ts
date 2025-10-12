import { arenas } from "../../repositories/arena_repository";

export class GetAllArenasQuery {
  constructor() {}

  public execute(zona?: string): Arena[] {
    if (zona) {
      console.log("Zona fornecida:", zona);

      const arenas_filtradas = arenas.filter((arena) => arena.zona === zona);

      console.log("Arenas filtradas:", arenas_filtradas);

      return arenas_filtradas;
    }

    return arenas;
  }
}
