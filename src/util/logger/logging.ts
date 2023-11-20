import { NextFunction, Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid'
import { logger, setLogTraceId } from "./logger"

export const loggingMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  (async () => {
    const traceId = uuidv4()
    setLogTraceId(traceId)
    logger.info(loggingMiddleware.name, loggingMiddleware.name, undefined, `URL: "${req.url}" Queries: ${JSON.stringify(req.query)} Params: ${JSON.stringify(req.params)} Body: ${JSON.stringify(req.body)}`)
    return next()
  })()
}