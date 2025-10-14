import { Arena } from "../../models/arena_model";
import { arenas } from "../../repositories/arena_repository";

export class GetAllArenasQuery {
  constructor() {}

  public execute(
    nome?: string,
    zona?: string,
    endereco?: string,
    geolocalizacao?: string
  ): Arena[] {
    let arenasData = arenas;
    if (nome || zona || endereco || geolocalizacao) {
      arenasData = this.getFilteredArenas(
        arenasData,
        nome,
        zona,
        endereco,
        geolocalizacao
      );
      return arenasData;
    }
    return arenasData;
  }

  private getFilteredArenas(
    arenas: Arena[],
    nome?: string,
    zona?: string,
    endereco?: string,
    geolocalizacao?: string
  ): Arena[] {
    nome && (arenas = this.filterByName(arenas, nome));
    zona && (arenas = this.filterByZone(arenas, zona));
    endereco && (arenas = this.filterByAddress(arenas, endereco));
    geolocalizacao &&
      (arenas = this.filterByGeolocation(arenas, geolocalizacao));
    return arenas;
  }

  private filterByName(arenas: Arena[], nome: string): Arena[] {
    return arenas.filter((arena) =>
      arena.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  private filterByZone(arenas: Arena[], zona: string): Arena[] {
    return arenas.filter((arena) => arena.zona === zona);
  }

  private filterByAddress(arenas: Arena[], endereco: string): Arena[] {
    return arenas.filter((arena) =>
      arena.endereco?.toLowerCase().includes(endereco.toLowerCase())
    );
  }

  private filterByGeolocation(
    arenas: Arena[],
    geolocalizacao: string
  ): Arena[] {
    return arenas.filter((arena) =>
      arena.geolocalizacao?.toLowerCase().includes(geolocalizacao.toLowerCase())
    );
  }
}
