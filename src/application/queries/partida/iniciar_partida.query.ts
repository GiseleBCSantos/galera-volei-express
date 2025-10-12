import { InvalidValuesException } from "../../../presentation/exceptions/InvalidValuesException";
import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { STATUS_PARTIDA } from "../../models/partida_model";
import { partidas } from "../../repositories/partida_repository";

export class IniciarPartidaQuery {
  constructor() {}

  public execute(id: string) {
    const partida = partidas.find((partida) => partida.id === id);
    if (!partida) {
      throw new ObjectNotFound("Partida com id " + id + " não encontrada");
    }
    if (partida.status !== STATUS_PARTIDA.AGENDADA) {
      throw new InvalidValuesException("Partida não pode ser iniciada");
    }
    partida.status = STATUS_PARTIDA.EM_ANDAMENTO;
    partida.updatedAt = new Date();
    return partida;
  }
}
