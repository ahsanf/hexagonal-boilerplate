import { check, oneOf, validationResult } from "express-validator"
import {Request, Response, NextFunction} from "express"
import { logger } from "../../../../../util/logger/logger"

export const validateRequest = 
[
  check('title').isString(),
  check('subtitle').isString().optional({checkFalsy: true}),
  check('image').isURL().optional({checkFalsy: true}),
  check('content').isString(),
  check('isRead').isBoolean().optional({checkFalsy: true}),
  check('url').isURL().optional({checkFalsy: true}),
  check('sender').isString(),
  check('receiver').isString(),
  check('destination').isString(),
  check('referenceId').isString().optional({checkFalsy: true}),
  check('isMuted').isBoolean().optional({checkFalsy: true}),
  check('type').isString().optional({checkFalsy: true}),
]

export const validateReadAllRequest = 
[
  check('receiver').isEmail(),
]

export const validateValidateRequest = 
[
  check('email').isEmail(),
  check('url').isString(),
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