import { check, oneOf, validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import { logger } from "@logger"

//add some validation here
export const validateLoginRequest =
  [
    check('email').isString(),
    check('password').isString(),
  ]

export const validateRegisterRequest = 
  [
    check('firstName').isString(),
    check('lastName').isString(),
    check('email').isString(),
    check('password').isString(),
    check('isSubsNewLetter').isBoolean(),
    check('regionId').isNumeric(),
  ]

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (e: any) {
    console.log(e.errors)
    logger.error(validationMiddleware.name, validationMiddleware.name, undefined, JSON.stringify(e.errors))
    return res.status(422).json(e)
  }
}