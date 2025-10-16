import { DomainException } from "./DomainException";

export class ObjectNotFound extends DomainException {
  constructor(public message: string, public statusCode: number = 404) {
    super(message);
    this.name = "ObjectNotFound";
    this.statusCode = statusCode;
  }
}
