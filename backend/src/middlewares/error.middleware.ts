import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  details?: Record<string, any> | null;

  constructor(
    message: string,
    statusCode?: number,
    details?: Record<string, any> | null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response: {
    success: false;
    error: {
      message: string;
      statusCode: number;
      details: Record<string, any> | null;
      stack?: string;
    };
  } = {
    success: false,
    error: {
      message,
      statusCode,
      details: err.details || null,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  };

  res.status(statusCode).json(response);
};

export default errorHandler;
