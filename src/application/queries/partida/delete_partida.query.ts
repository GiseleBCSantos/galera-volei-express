import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { partidas } from "../../repositories/partida_repository";

export class DeletePartidaQuery {
  constructor() {}
  public execute(id: string) {
    const partidaIndex = partidas.findIndex((partida) => partida.id === id);
    if (partidaIndex === -1) {
      throw new ObjectNotFound(`Partida com id ${id} não encontrada`);
    }
    partidas.splice(partidaIndex, 1);
  }
}
