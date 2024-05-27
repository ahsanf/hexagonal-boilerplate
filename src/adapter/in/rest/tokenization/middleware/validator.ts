import { check, oneOf, validationResult } from "express-validator"
import {Request, Response, NextFunction} from "express"
import { logger } from "../../../../../util/logger/logger"

export const validateRequest = 
[
  check('email').isEmail(),
  check('token').isString(),
]

export const validationMiddleware = (req:Request, res:Response, next:NextFunction) => {
  try{
    validationResult(req).throw()
    return next()
  }catch(e:any){
    console.log(e.errors)
    logger.error("validationMiddleware", validationMiddleware.name, undefined, JSON.stringify(e.errors))
    return res.status(422).json(e)
  }
}