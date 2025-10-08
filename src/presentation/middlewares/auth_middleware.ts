import { NextFunction, Request, Response } from "express";

const auth_middleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    const message = "Acesso negado. Sem crachá.";
    return res.status(401).json({ detail: message });
  }

  if (authorization !== "123") {
    const message = "Acesso negado. Crachá inválido.";
    return res.status(401).json({ detail: message });
  }

  next();
};
