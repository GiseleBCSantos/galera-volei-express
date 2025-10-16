import { ObjectNotFound } from "../../exceptions/ObjectNotFount";
import { jogadores } from "../../repositories/jogador_repository";

export class GetJogadorByIdQuery {
  constructor() {}

  execute(id: string): Jogador | undefined {
    const jogador = jogadores.find((jogador) => jogador.id === id);
    if (!jogador) {
      throw new ObjectNotFound("Jogador com id " + id + " não encontrado");
    }
    return jogador;
  }
}
