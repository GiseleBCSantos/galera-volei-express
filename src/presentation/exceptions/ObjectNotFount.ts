export class ObjectNotFound extends Error {
  constructor(public message: string, public statusCode: number = 404) {
    super(message);
    this.name = "ObjectNotFound";
    this.statusCode = statusCode;
  }
}
