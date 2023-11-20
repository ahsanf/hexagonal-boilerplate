import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "./application_error";
import { formatError } from "./format_error";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if(error instanceof ApplicationError){
    const code: any = error.statusCode || 500;
    return res.status(code).json(formatError(error));
  } else if(error instanceof Error) {
    return res.status(500).json(formatError(error.message));
  } else {
    return res.status(500).json(formatError(error))
  }
  
}