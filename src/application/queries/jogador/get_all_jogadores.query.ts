import { jogadores } from "../../repositories/jogador_repository";

export class GetAllJogadoresQuery {
  constructor() {}

  execute(
    nome: string | undefined,
    email: string | undefined,
    sexo: string | undefined,
    idade: number | undefined
  ): Array<Jogador> {
    let jogadoresFiltrados = jogadores;
    if (nome || email || sexo || idade) {
      jogadoresFiltrados = this.getFilteredJogadores(
        jogadoresFiltrados,
        nome,
        email,
        sexo,
        idade
      );
      return jogadoresFiltrados;
    }
    return jogadores;
  }

  private getFilteredJogadores(
    jogadores: Array<Jogador>,
    nome?: string,
    email?: string,
    sexo?: string,
    idade?: number
  ): Array<Jogador> {
    nome && (jogadores = this.filterByName(jogadores, nome));
    email && (jogadores = this.filterByEmail(jogadores, email));
    sexo && (jogadores = this.filterBySex(jogadores, sexo));
    idade && (jogadores = this.filterByAge(jogadores, idade));
    return jogadores;
  }

  private filterByName(
    jogadores: Array<Jogador>,
    nome: string
  ): Array<Jogador> {
    return jogadores.filter((jogador) =>
      jogador.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  private filterByEmail(
    jogadores: Array<Jogador>,
    email: string
  ): Array<Jogador> {
    return jogadores.filter((jogador) =>
      jogador.email.toLowerCase().includes(email.toLowerCase())
    );
  }

  private filterBySex(jogadores: Array<Jogador>, sexo: string): Array<Jogador> {
    return jogadores.filter((jogador) => jogador.sexo === sexo);
  }

  private filterByAge(
    jogadores: Array<Jogador>,
    idade: number
  ): Array<Jogador> {
    return jogadores.filter((jogador) => jogador.idade == idade);
  }
}
