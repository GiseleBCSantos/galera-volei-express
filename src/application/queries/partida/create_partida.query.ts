import { v4 as uuid } from "uuid";
import { partidas } from "../../repositories/partida_repository";
import { InvalidValuesException } from "../../../presentation/exceptions/InvalidValuesException";
import { STATUS_PARTIDA, TIPO_PARTIDA } from "../../models/partida_model";

export class CreatePartidaQuery {
  constructor() {}
  public execute(
    adminId: string,
    nome: string,
    data_partida: Date,
    arenaId: string,
    jogadoresIds: string[],
    num_max_jogadores?: number,
    tipo: (typeof TIPO_PARTIDA)[keyof typeof TIPO_PARTIDA] = TIPO_PARTIDA.PUBLICA
  ) {
    const parsedDate = new Date(data_partida);
    if (
      !adminId ||
      !nome ||
      !parsedDate ||
      !arenaId ||
      !jogadoresIds ||
      !(parsedDate instanceof Date)
    ) {
      throw new InvalidValuesException(
        "Dados inválidos para criação de partida"
      );
    }
    const newPartida = {
      id: uuid(),
      adminId,
      nome,
      data_partida,
      arenaId,
      jogadoresIds,
      status: STATUS_PARTIDA.AGENDADA,
      num_max_jogadores,
      tipo,
      createdAt: new Date(),
    };
    partidas.push(newPartida);
    return newPartida;
  }
}
