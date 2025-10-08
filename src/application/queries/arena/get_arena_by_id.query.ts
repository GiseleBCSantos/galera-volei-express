import { v4 as uuid } from "uuid";

import { NotFoundHTTPException } from "../../../presentation/exceptions/NotFoundHTTPException";

export class GetArenaById {
  constructor() {}

  public execute(id: number) {
    if (id > 100) {
      throw new NotFoundHTTPException(`Não há uma arena com id = (${id})`);
    }

    const arena = { id: uuid(), nome: "THE Beach", zona: "Leste" };
    return arena;
  }
}
