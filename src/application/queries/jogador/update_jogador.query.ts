import { InvalidValuesException } from "../../../presentation/exceptions/InvalidValuesException";
import { ObjectNotFound } from "../../../presentation/exceptions/ObjectNotFount";
import { jogadores } from "../../repositories/jogador_repository";

export class UpdateJogadorQuery {
  constructor() {}

  execute(
    id: string,
    nome: string,
    email: string,
    idade: number,
    sexo: "M" | "F" | "Outro"
  ): Jogador | undefined {
    if (!nome || !email || idade <= 0 || !["M", "F", "Outro"].includes(sexo)) {
      throw new InvalidValuesException(
        "Dados inválidos para atualizar o jogador"
      );
    }
    const jogadorIndex = jogadores.findIndex((jogador) => jogador.id === id);
    if (jogadorIndex === -1) {
      throw new ObjectNotFound("Jogador com id " + id + " não encontrado");
    }
    const updatedJogador = {
      ...jogadores[jogadorIndex],
      nome,
      email,
      idade,
      sexo,
    };
    jogadores[jogadorIndex] = updatedJogador;
    return updatedJogador;
  }
}
