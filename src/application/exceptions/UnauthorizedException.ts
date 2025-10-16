import { DomainException } from "./DomainException";

export class UnauthorizedException extends DomainException {
  constructor(message: string, public statusCode: number = 401) {
    super(message);
    this.name = "UnauthorizedException";
  }
}
