import { NotFoundHTTPException } from "../../../presentation/exceptions/NotFoundHTTPException";
import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { arenas } from "../../repositories/arena_repository";

export class UpdateArena {
  constructor() {}
  public execute(
    id: string,
    nome: string,
    zona: string,
    endereco?: string,
    geolocalizacao?: string
  ) {
    const arenaIndex = arenas.findIndex((arena) => arena.id === id);
    if (arenaIndex === -1) {
      throw new ObjectNotFound("Arena com id " + id + " não encontrada");
    }
    const updatedArena = {
      ...arenas[arenaIndex],
      nome: nome,
      zona: zona,
      endereco: endereco,
      geolocalizacao: geolocalizacao,
    };
    arenas[arenaIndex] = updatedArena;
    return updatedArena;
  }
}
