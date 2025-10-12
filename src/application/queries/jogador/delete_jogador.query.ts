import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { jogadores } from "../../repositories/jogador_repository";

export class DeleteJogadorQuery {
  constructor() {}

  execute(id: string): void {
    const jogadorIndex = jogadores.findIndex((jogador) => jogador.id === id);
    if (jogadorIndex === -1) {
      throw new ObjectNotFound("Jogador com id " + id + " não encontrado");
    }
    jogadores.splice(jogadorIndex, 1);
  }
}
