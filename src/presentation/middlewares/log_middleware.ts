import { NextFunction, Request, Response } from "express";

export const log_middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const mensagem = `[${new Date().toISOString()}] Olá, tudo bem?`;

  console.log(mensagem);

  next();
};
