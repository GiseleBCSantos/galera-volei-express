import { ObjectNotFound } from "../../exceptions/ObjectNotFount";
import { arenas } from "../../repositories/arena_repository";

export class DeleteArena {
  constructor() {}
  public execute(id: string) {
    const arenaIndex = arenas.findIndex((arena) => arena.id === id);
    if (arenaIndex === -1) {
      throw new ObjectNotFound(`Arena com id ${id} não encontrada`);
    }
    arenas.splice(arenaIndex, 1);
  }
}
