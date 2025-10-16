import { NextFunction, Request, Response } from "express";
import { HTTPException } from "../exceptions/HTTPException";

export const global_error_exception = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof HTTPException) {
    const message = error.message;
    return res.status(error.statusCode).json({ detail: message });
  }

  const message = `${error.message} --> Tá tudo bem.`;
  return res.status(200).json({ detail: message });
};
