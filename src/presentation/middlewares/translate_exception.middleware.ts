import { DomainException } from "../../application/exceptions/DomainException";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../../application/exceptions/UnauthorizedException";
import { ObjectNotFound } from "../../application/exceptions/ObjectNotFount";
import { HTTPException } from "../exceptions/HTTPException";
import { InvalidValuesException } from "../../application/exceptions/InvalidValuesException";
import { NotFoundHTTPException } from "../exceptions/NotFoundHTTPException";
import { BusinessRuleException } from "../../application/exceptions/BusinessRuleException";
import { MaxJogadoresExcedidoException } from "../../application/exceptions/MaxJogadoresExcedidoException";

export const translate_exception_middleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof DomainException) {
    if (error instanceof ObjectNotFound) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof UnauthorizedException) {
      return res.status(401).json({ message: error.message });
    }

    if (error instanceof InvalidValuesException) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof BusinessRuleException) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof MaxJogadoresExcedidoException) {
      return res.status(400).json({ message: error.message });
    }
  }

  if (error instanceof NotFoundHTTPException) {
    return res.status(404).json({ message: error.message });
  }

  if (error instanceof HTTPException) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).json({ message: "Internal Server Error" });
};
