import { Filter } from "../../../../../domain/filter"
import { MessageNotification } from "../../../../../domain/message_notification"
import { FCMBaseRepository } from "../repository/base_repository"
import { FCMRepository } from "../repository/repository"
import { domainToEntity } from "../util/converter"
import { FCMBaseAdapter } from "./base_adapter"

export class FCMAdapter implements FCMBaseAdapter {
  private repository: FCMBaseRepository

  constructor () {
    this.repository = new FCMRepository()
  }

  async send(token: string, data: MessageNotification, traceId?:string): Promise<void> {
    return await this.repository.send(token, domainToEntity(data), traceId)
  }
}