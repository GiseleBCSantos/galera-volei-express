import { v4 as uuid } from "uuid";
import { arenas } from "../../repositories/arena_repository";
import { InvalidValuesException } from "../../../presentation/exceptions/InvalidValuesException";

export class CreateArena {
  constructor() {}
  public execute(
    nome: string,
    zona: string,
    endereco?: string,
    geolocalizacao?: string
  ) {
    if (!nome || !zona) {
      throw new InvalidValuesException("Dados inválidos");
    }
    const newArena = { id: uuid(), nome, zona, endereco, geolocalizacao };
    arenas.push(newArena);
    return newArena;
  }
}
