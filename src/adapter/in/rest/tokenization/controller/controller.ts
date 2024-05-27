import {Express, Request, Response} from "express"
import { dataToRestResponse, errorToRestResponse } from "../util/converter"
import { RestResponse } from "../entity/response"
import { loggingMiddleware } from "../../../../../util/logger/logging" 
import { getLogTraceId, logger } from "../../../../../util/logger/logger"
import { BaseController } from "../../../../../common/base_controller"
import { authMiddleware } from "../../../../../util/middlewares/auth" 
import { validateRequest, validationMiddleware } from "../middleware/validator"
import { RegistrationUseCase } from "../../../../../app/port/out/registration_use_case"
import { RegistrationService } from "../../../../../app/service/registration_service"

export class TokenizationRestController implements BaseController{
  private app:Express
  private service:RegistrationUseCase
  
  constructor (app:Express){
    this.app = app
    this.service = new RegistrationService()
  }

  init () {
    this.app.post('/tokenization', authMiddleware, loggingMiddleware, validateRequest, validationMiddleware, async (req:Request, res:Response) => {
      try{
        await this.service.register(req.body.email, req.body.token, getLogTraceId())
        const response: RestResponse = dataToRestResponse({})
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, TokenizationRestController.name, undefined, e)
        if(e === 'ALREADY'){
          res.status(400).json(errorToRestResponse('Data Already Exist'))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
    this.app.delete('/tokenization/:id', authMiddleware, loggingMiddleware, async (req:Request, res:Response) => {
      try{
        await this.service.clear(req.params.id, getLogTraceId())
        const response: RestResponse = dataToRestResponse({})
        res.json(response)
      }catch(e:any){
        logger.error(this.constructor.name, TokenizationRestController.name, undefined, e)
        if(e === 'EMPTY'){
          res.status(204).json(errorToRestResponse(e))
        }else{
          res.status(500).json(errorToRestResponse(e))
        }
      }
    })
  }
}