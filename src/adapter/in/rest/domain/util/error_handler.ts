import { Response } from "express";
import { ApplicationError } from "../../../../../util/error/application_error";
import { formatError } from "../../../../../util/error/format_error";

export const errorHandler = (error: any, res: Response) => {
  if(error instanceof ApplicationError){
    const code: any = error.statusCode || 500;
    res.status(code).json(formatError(error));
  } else {
    res.status(500).json(formatError(error))
  }
}