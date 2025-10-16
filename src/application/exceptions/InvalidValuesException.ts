import { DomainException } from "./DomainException";

export class InvalidValuesException extends DomainException {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = "InvalidValuesException";
  }
}
