import { BusinessRuleException } from "./BusinessRuleException";

export class MaxJogadoresExcedidoException extends BusinessRuleException {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = "MaxJogadoresExcedidoException";
  }
}
