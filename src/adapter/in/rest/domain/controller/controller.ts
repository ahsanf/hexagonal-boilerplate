
import { Express, Request, Response } from "express"
import { DomainService } from "@service/domain_service"
import { RestResponse } from "../entity/response"
import { dataToRestResponse } from "../util/converter"
import { BaseController } from "@common/base_controller"
import { errorHandler } from "@util/error/error_handler"

export class DomainController implements BaseController {
  private app: Express
  private service: DomainService

  constructor(app: Express){
    this.app = app
    this.service = new DomainService()
  }
  
  init(): void {
    this.app.post(`/auth/register`, this.insertHandler.bind(this))
  }
  
  private async insertHandler(req: Request, res: Response): Promise<void> {
    try {
      const data = {}
      const domainData = await this.service.insert()
      const response: RestResponse = dataToRestResponse(domainData)
      res.json(response)
    } catch (error: any) {
      errorHandler(error, res)
    }
  }
  
}
