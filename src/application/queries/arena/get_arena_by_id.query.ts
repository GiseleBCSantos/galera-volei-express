import { v4 as uuid } from "uuid";

import { arenas } from "../../repositories/arena_repository";
import { ObjectNotFound } from "../../exceptions/ObjectNotFount";

export class GetArenaById {
  constructor() {}

  public execute(id: string) {
    const arena = arenas.find((arena) => arena.id === id);
    if (!arena) {
      throw new ObjectNotFound(`Arena com id ${id} não encontrada`);
    }
    return arena;
  }
}
