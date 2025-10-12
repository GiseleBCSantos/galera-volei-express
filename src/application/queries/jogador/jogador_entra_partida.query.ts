import { MaxJogadoresExcedidoException } from "../../../presentation/exceptions/MaxJogadoresExcedidoException";
import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { partidas } from "../../repositories/partida_repository";

export class JogadorEntraPartidaQuery {
  constructor() {}

  public execute(jogadorId: string, partidaId: string) {
    const partida = partidas.find((p) => p.id === partidaId);
    if (!partida) {
      throw new ObjectNotFound(`Partida com id ${partidaId} não encontrada`);
    }
    if (
      partida.num_max_jogadores &&
      partida.jogadoresIds.length + 1 > partida.num_max_jogadores
    ) {
      throw new MaxJogadoresExcedidoException(
        `Número máximo de jogadores atingido para a partida ${partidaId}`
      );
    }

    partida.jogadoresIds.push(jogadorId);
    return partida;
  }
}
