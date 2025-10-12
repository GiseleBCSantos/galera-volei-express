import { Partida } from "../../models/partida_model";
import { partidas } from "../../repositories/partida_repository";

export class GetAllPartidasQuery {
  constructor() {}

  public execute(): Array<Partida> {
    return partidas;
  }
}
