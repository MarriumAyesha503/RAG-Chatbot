import { Request, Response, NextFunction } from "express";

export class RAGError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("ERROR:", err);

  const status = err.statusCode || 500;

  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
};