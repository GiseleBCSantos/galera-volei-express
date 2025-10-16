import { InvalidValuesException } from "../../exceptions/InvalidValuesException";
import { ObjectNotFound } from "../../exceptions/ObjectNotFount";
import { UnauthorizedException } from "../../exceptions/UnauthorizedException";
import { jogadores } from "../../repositories/jogador_repository";
import { partidas } from "../../repositories/partida_repository";

export class ConvidarParaPartidaQuery {
  constructor() {}

  public execute(
    jogadorAnfitriaoId: string,
    jogadorConvidadoId: string,
    partidaId: string
  ) {
    const partida = partidas.find((partida) => partida.id === partidaId);
    if (!partida) {
      throw new ObjectNotFound("Partida não encontrada");
    }

    const jogadorAnfitriao = jogadores.find(
      (jogador) => jogador.id === jogadorAnfitriaoId
    );
    if (!jogadorAnfitriao) {
      throw new ObjectNotFound("Jogador anfitrião não encontrado");
    }

    const jogadorConvidado = jogadores.find(
      (jogador) => jogador.id === jogadorConvidadoId
    );

    if (!jogadorConvidado) {
      throw new ObjectNotFound("Jogador convidado não encontrado");
    }

    if (partida.adminId !== jogadorAnfitriaoId) {
      throw new UnauthorizedException(
        "Apenas o administrador da partida pode convidar jogadores"
      );
    }

    if (partida.jogadoresIds.includes(jogadorConvidadoId)) {
      throw new InvalidValuesException("Jogador já está na partida");
    }

    partida.jogadoresIds.push(jogadorConvidadoId);
    partida.updatedAt = new Date();
    return partida;
  }
}
