import { Filter } from "../../../domain/filter"
import { MessageNotification } from "../../../domain/message_notification"
import { Stats } from "../../../domain/stats"

export interface NotificationUseCase{
  getAll (filter:Filter, perPage?: number | undefined, currentPage?: number | undefined, traceId?:string):Promise<MessageNotification[]>
  getAllStats(filter:Filter, perPage?: number | undefined, currentPage?: number | undefined, traceId?: string | undefined): Promise<Stats>
  getAllCount (filter:Filter, traceId?:string):Promise<number>
  getById (id:string, traceId?:string):Promise<MessageNotification>
  add (data:MessageNotification, traceId?:string):Promise<string>
  edit (data:MessageNotification, traceId?:string):Promise<void>
  readAll (receiver:string, traceId?:string):Promise<void>
  remove (id:string, traceId?:string):Promise<void>
}