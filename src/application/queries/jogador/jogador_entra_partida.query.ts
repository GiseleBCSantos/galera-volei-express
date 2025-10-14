import { MaxJogadoresExcedidoException } from "../../../presentation/exceptions/MaxJogadoresExcedidoException";
import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { UnauthorizedException } from "../../../presentation/exceptions/UnauthorizedException";
import { TIPO_PARTIDA } from "../../models/partida_model";
import { partidas } from "../../repositories/partida_repository";

export class JogadorEntraPartidaQuery {
  constructor() {}

  public execute(jogadorId: string, partidaId: string) {
    const partida = partidas.find((p) => p.id === partidaId);
    if (!partida) {
      throw new ObjectNotFound(`Partida com id ${partidaId} não encontrada`);
    }
    if (
      partida.tipo === TIPO_PARTIDA.PRIVADA &&
      partida.adminId !== jogadorId
    ) {
      throw new UnauthorizedException(
        `Partida com id ${partidaId} é privada. Convite necessário para entrar.`
      );
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
