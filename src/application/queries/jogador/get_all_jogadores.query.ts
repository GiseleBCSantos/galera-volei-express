import { jogadores } from "../../repositories/jogador_repository";

export class GetAllJogadoresQuery {
  constructor() {}

  execute(): Array<Jogador> {
    return jogadores;
  }
}
