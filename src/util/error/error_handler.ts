import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "./application_error";
import { formatError } from "./format_error";
import { errorToRestResponse } from "@util/converter/global_converter";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if(error instanceof ApplicationError){
    const code: any = error.statusCode || 500;
    return res.status(code).json(formatError(error));
  } else {
    return res.status(500).json(errorToRestResponse(error))
  }
  
}