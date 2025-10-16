import { InvalidValuesException } from "../../exceptions/InvalidValuesException";
import { ObjectNotFound } from "../../exceptions/ObjectNotFount";
import { arenas } from "../../repositories/arena_repository";
import { partidas } from "../../repositories/partida_repository";

export class UpdatePartidaQuery {
  constructor() {}
  public execute(
    id: string,
    nome: string,
    data_partida: Date,
    arenaId: string,
    jogadoresIds: string[]
  ) {
    const parsedDate = new Date(data_partida);
    if (
      !nome ||
      !parsedDate ||
      !arenaId ||
      !jogadoresIds ||
      !(parsedDate instanceof Date)
    ) {
      throw new InvalidValuesException(
        "Dados inválidos para atualização de partida"
      );
    }
    const partidaIndex = partidas.findIndex((partida) => partida.id === id);
    if (partidaIndex === -1) {
      throw new ObjectNotFound("Partida com id " + id + " não encontrada");
    }
    const updatedPartida = {
      ...partidas[partidaIndex],
      nome: nome,
      data_partida: data_partida,
      arenaId: arenaId,
      jogadoresIds: jogadoresIds,
      updatedAt: new Date(),
    };
    partidas[partidaIndex] = updatedPartida;
    return updatedPartida;
  }
}
