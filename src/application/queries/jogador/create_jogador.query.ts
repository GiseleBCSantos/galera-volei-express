import { v4 as uuid } from "uuid";
import { jogadores } from "../../repositories/jogador_repository";
import { InvalidValuesException } from "../../exceptions/InvalidValuesException";

export class CreateJogadorQuery {
  constructor() {}

  execute(
    nome: string,
    email: string,
    idade: number,
    sexo: "M" | "F" | "Outro"
  ): Jogador {
    const idadeNum = Number(idade);
    const sexoNormalizado = String(sexo).trim();

    if (
      !nome ||
      !email ||
      isNaN(idadeNum) ||
      idadeNum <= 0 ||
      !["M", "F", "Outro"].includes(sexoNormalizado)
    ) {
      throw new InvalidValuesException("Dados inválidos para criar um jogador");
    }
    const novoJogador: Jogador = {
      id: uuid(),
      nome,
      email,
      idade,
      sexo,
    };
    jogadores.push(novoJogador);
    return novoJogador;
  }
}
