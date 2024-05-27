import {Express, Request, Response} from "express"
import { dataToRestResponse, errorToRestResponse } from "../util/converter"
import { RestResponse } from "../entity/response"
import { loggingMiddleware } from "../../../../../util/logger/logging" 
import { getLogTraceId, logger } from "../../../../../util/logger/logger"
import { BaseController } from "../../../../../common/base_controller"
import { authMiddleware } from "../../../../../util/middlewares/auth" 
import { NotificationUseCase } from "../../../../../app/port/out/notification_use_case"
import { NotificationService } from "../../../../../app/service/notification_service"
import { validateReadAllRequest, validateRequest, validateValidateRequest, validationMiddleware } from "../middleware/validator"
import { MessageNotification } from "../../../../../domain/message_notification"

export class NotificationRestController implements BaseController{
  private app:Express
  private service:NotificationUseCase
  
  constructor (app:Express){
    this.app = app
    this.service = new NotificationService()
  }

  parseIsRead (val:any):any {
    if (val !== undefined) {
      if (val === 'true') {
        return true
      } else {
        return false
      }
    }
    return undefined
  }

  init () {
    this.app.get('/notification', loggingMiddleware, async (req:Request, res:Response) => {
      try{
        const perPage: number = req.query.per_page !== undefined ? parseInt(req.query.per_page.toString()) : 100
        const currentPage: number = req.query.page !== undefined ? parseInt(req.query.page.toString()) : 1
        const filter = {
          query: req.query.q !== undefined ? req.query.q.toString() : '',
          isRead: this.parseIsRead(req.query.isRead),
          receiver: req.query.receiver !== undefined ? req.query.receiver.toString() : undefined,
        }
        const traceId = getLogTraceId()
        const result: MessageNotification[] = await this.service.getAll(filter, perPage, currentPage, traceId)
        const stats = await this.service.getAllStats(filter, perPage, currentPage, traceId)
        const response: RestResponse = dataToRestResponse(result, stats)
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, NotificationRestController.name, undefined, e)
        if(e === 'EMPTY'){
          res.status(204).json(errorToRestResponse('Data Not Found'))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
    this.app.get('/notification_count', loggingMiddleware, async (req:Request, res:Response) => {
      try{
        const result: number = await this.service.getAllCount({
          query: req.query.q !== undefined ? req.query.q.toString() : '',
          isRead: this.parseIsRead(req.query.isRead),
          receiver: req.query.receiver !== undefined ? req.query.receiver.toString() : undefined,
        }, getLogTraceId())
        const response: RestResponse = dataToRestResponse(result)
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, NotificationRestController.name, undefined, e)
        if(e === 'EMPTY'){
          res.status(204).json(errorToRestResponse('Data Not Found'))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
    this.app.get('/notification/:id', loggingMiddleware, async (req:Request, res:Response) => {
      try{
        const result: MessageNotification = await this.service.getById(req.params.id, getLogTraceId())
        const response: RestResponse = dataToRestResponse(result)
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, NotificationRestController.name, undefined, e)
        if(e === 'EMPTY'){
          res.status(204).json(errorToRestResponse('Data Not Found'))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
    this.app.post('/notification', authMiddleware, loggingMiddleware, validateRequest, validationMiddleware, async (req:Request, res:Response) => {
      try{
        await this.service.add(req.body, getLogTraceId())
        const response: RestResponse = dataToRestResponse({})
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, NotificationRestController.name, undefined, e)
        if(e === 'ALREADY'){
          res.status(400).json(errorToRestResponse('Data Already Exist'))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
    this.app.put('/notification/:id', authMiddleware, loggingMiddleware, validateRequest, validationMiddleware, async (req:Request, res:Response) => {
      try{
        await this.service.edit({
          ...req.body,
          id: req.params.id,
          email: req.params.email
        }, getLogTraceId())
        const response: RestResponse = dataToRestResponse({})
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, NotificationRestController.name, undefined, e)
        if(e === 'EMPTY'){
          res.status(204).json(errorToRestResponse('Data Not Found'))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
    this.app.post('/notification_readall', authMiddleware, loggingMiddleware, validateReadAllRequest, validationMiddleware, async (req:Request, res:Response) => {
      try{
        await this.service.readAll(req.body.receiver, getLogTraceId())
        const response: RestResponse = dataToRestResponse({})
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, NotificationRestController.name, undefined, e)
        if(e === 'EMPTY'){
          res.status(204).json(errorToRestResponse('Data Not Found'))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
    this.app.delete('/notification/:id', authMiddleware, loggingMiddleware, async (req:Request, res:Response) => {
      try{
        await this.service.remove(req.params.id, getLogTraceId())
        const response: RestResponse = dataToRestResponse({})
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, NotificationRestController.name, undefined, e)
        if(e === 'EMPTY'){
          res.status(204).json(errorToRestResponse(e))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
  }
}