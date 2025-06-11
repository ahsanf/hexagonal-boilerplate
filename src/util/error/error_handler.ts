import { Response } from "express";
import { ApplicationError } from "./application_error";
import { formatError } from "./format_error";

export const errorHandler = (error: any, res: Response) => {
  if(error instanceof ApplicationError){
    const code: any = error.statusCode || 500;
    return res.status(code).json(formatError(error));
  } else {
    return res.status(500).json({
      "error": {
          "type": "APP",
          "code": "INTERNAL SERVER ERROR",
          "statusCode": 500,
          "message": error.message || error.toString(),
      },
      "success": false
    })
  }
  
}