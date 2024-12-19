
import { Express, Request, Response } from "express"
import { DomainService } from "@service/domain_service"
import { errorHandler } from "../util/error_handler"
import { RestResponse } from "../entity/response"
import { dataToRestResponse } from "../util/converter"
import { BaseController } from "@common/base_controller"

export class DomainController implements BaseController {
  private app: Express
  private service: DomainService
  private apiVersion: string

  constructor(app: Express, apiVersion: string){
    this.app = app
    this.service = new DomainService()
    this.apiVersion = apiVersion
  }
  
  init(): void {
    this.app.post(`/${this.apiVersion}/auth/register`, (req: Request, res: Response) => {
      (async ()=>{
        try {
          const data = {} // add your data here
          const registerUser: void = await this.service.insert()
          const response: RestResponse = dataToRestResponse(registerUser)
          res.json(response) 
        } catch (error: any) {
          errorHandler(error, res)
        }
      })();
    })
  }
  
}
