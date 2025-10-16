import { DomainException } from "./DomainException";

export class BusinessRuleException extends DomainException {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = "BusinessRuleException";
  }
}
