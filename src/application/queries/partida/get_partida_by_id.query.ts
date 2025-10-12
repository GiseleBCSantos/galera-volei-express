import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { partidas } from "../../repositories/partida_repository";

export class GetPartidaByIdQuery {
  constructor() {}

  public execute(id: string): Partida | undefined {
    const partida = partidas.find((partida) => partida.id === id);

    if (!partida) {
      throw new ObjectNotFound("Partida not found");
    }
    return partida;
  }
}
