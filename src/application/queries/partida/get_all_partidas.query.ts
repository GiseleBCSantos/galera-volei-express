import { Partida } from "../../models/partida_model";
import { partidas } from "../../repositories/partida_repository";

export class GetAllPartidasQuery {
  constructor() {}

  public execute(
    nome: string | undefined,
    data_partida: string | undefined,
    arenaId: string | undefined,
    adminId: string | undefined,
    num_max_jogadores: string | undefined,
    tipo: string | undefined
  ): Array<Partida> {
    const allPartidas = partidas;
    const filteredPartidas = this.getFilteredPartidas(
      allPartidas,
      nome,
      data_partida,
      arenaId,
      adminId,
      num_max_jogadores,
      tipo
    );
    return filteredPartidas;
  }

  private getFilteredPartidas(
    partidas: Partida[],
    nome?: string,
    data_partida?: string,
    arenaId?: string,
    adminId?: string,
    num_max_jogadores?: string,
    tipo?: string
  ): Array<Partida> {
    nome && (partidas = this.filterByName(partidas, nome));
    data_partida &&
      (partidas = this.filterByDate(partidas, new Date(data_partida)));
    arenaId && (partidas = this.filterByArenaId(partidas, arenaId));
    adminId && (partidas = this.filterByAdminId(partidas, adminId));
    num_max_jogadores &&
      (partidas = this.filterByMaxPlayers(partidas, Number(num_max_jogadores)));
    tipo && (partidas = this.filterByType(partidas, tipo));
    return partidas;
  }

  private filterByName(partidas: Array<Partida>, nome: string): Array<Partida> {
    return partidas.filter((partida) =>
      partida.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  private filterByDate(
    partidas: Array<Partida>,
    data_partida: Date
  ): Array<Partida> {
    return partidas.filter(
      (partida) =>
        new Date(partida.data_partida).toDateString() ===
        data_partida.toDateString()
    );
  }

  private filterByArenaId(
    partidas: Array<Partida>,
    arenaId: string
  ): Array<Partida> {
    return partidas.filter((partida) => partida.arenaId == arenaId);
  }

  private filterByAdminId(
    partidas: Array<Partida>,
    adminId: string
  ): Array<Partida> {
    return partidas.filter((partida) => partida.adminId == adminId);
  }

  private filterByMaxPlayers(
    partidas: Array<Partida>,
    num_max_jogadores: number
  ): Array<Partida> {
    return partidas.filter(
      (partida) => partida.num_max_jogadores == num_max_jogadores
    );
  }

  private filterByType(partidas: Array<Partida>, tipo: string): Array<Partida> {
    return partidas.filter((partida) => partida.tipo === tipo);
  }
}
