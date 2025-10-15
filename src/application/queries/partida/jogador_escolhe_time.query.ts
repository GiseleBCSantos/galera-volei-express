import { BusinessRuleException } from "../../../presentation/exceptions/BusinessRuleException";
import { InvalidValuesException } from "../../../presentation/exceptions/InvalidValuesException";
import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { Partida } from "../../models/partida_model";
import { jogadores } from "../../repositories/jogador_repository";
import { partidas } from "../../repositories/partida_repository";
import { GetJogadorByIdQuery } from "../jogador/get_jogador_by_id.query";
import { GetPartidaByIdQuery } from "./get_partida_by_id.query";

export class JogadorEscolheTimeQuery {
  execute(
    partidaId: string,
    jogadorId: string,
    timeEscolhido: "A" | "B"
  ): Partida {
    this.validarParametros(partidaId, jogadorId, timeEscolhido);

    const partida = this.buscarPartida(partidaId);
    const jogador = this.buscarJogador(jogadorId);

    this.validarJogadorNaPartida(partida, jogadorId);
    this.validarStatusPartida(partida);
    this.validarTipoEscolha(partida);

    if (timeEscolhido === "A") {
      partida.timeB!.timeBPlanejamento = (
        partida.timeB!.timeBPlanejamento || []
      ).filter((id) => id !== jogadorId);
      partida.timeA!.timeAPlanejamento = [
        ...(partida.timeA!.timeAPlanejamento || []),
        jogadorId,
      ];
    } else {
      partida.timeA!.timeAPlanejamento = (
        partida.timeA!.timeAPlanejamento || []
      ).filter((id) => id !== jogadorId);
      partida.timeB!.timeBPlanejamento = [
        ...(partida.timeB!.timeBPlanejamento || []),
        jogadorId,
      ];
    }

    return partida;
  }

  private validarParametros(
    partidaId: string,
    jogadorId: string,
    time: string
  ) {
    if (!partidaId || !jogadorId || !time) {
      throw new InvalidValuesException("Parâmetros inválidos");
    }

    if (time !== "A" && time !== "B") {
      throw new InvalidValuesException("Time escolhido inválido");
    }
  }

  private buscarPartida(partidaId: string) {
    const partida = new GetPartidaByIdQuery().execute(partidaId);
    if (!partida) throw new ObjectNotFound("Partida não encontrada");
    return partida;
  }

  private buscarJogador(jogadorId: string) {
    const jogador = new GetJogadorByIdQuery().execute(jogadorId);
    if (!jogador) throw new ObjectNotFound("Jogador não encontrado");
    return jogador;
  }

  private validarJogadorNaPartida(partida: any, jogadorId: string) {
    if (!partida.jogadoresIds.includes(jogadorId)) {
      throw new BusinessRuleException("Jogador não está na partida");
    }
  }

  private validarStatusPartida(partida: any) {
    if (partida.status !== "agendada") {
      throw new BusinessRuleException(
        "Não é possível escolher time em uma partida que não está agendada."
      );
    }
  }

  private validarTipoEscolha(partida: any) {
    if (partida.tipo_escolha_time !== "escolha_jogador") {
      throw new BusinessRuleException(
        "A escolha de time não pode ser feita pelo jogador nesta partida."
      );
    }
  }
}
