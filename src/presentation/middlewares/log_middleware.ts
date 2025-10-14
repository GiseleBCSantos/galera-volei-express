import { NextFunction, Request, Response } from "express";

export const log_middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const log = `[${new Date().toISOString()}] ${req.method} ${
      req.originalUrl
    } ${res.statusCode} - ${duration}ms`;
    console.log(log);
  });

  next();
};
