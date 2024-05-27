import { Filter } from "../../../../../domain/filter"
import { MessageNotification } from "../../../../../domain/message_notification"
import { Stats } from "../../../../../domain/stats"

export interface FirestoreBaseAdapter {
  findAll (traceId?: string, perPage?:number, currentPage?:number, filter?:Filter): Promise<MessageNotification[]>
  findAllStats (traceId?: string, perPage?:number, currentPage?:number, filter?:Filter): Promise<Stats>
  findAllCount (traceId?: string, filter?:Filter): Promise<number>
  findById (id: string, traceId?: string): Promise<MessageNotification>
  insert (data: MessageNotification, traceId?: string): Promise<string>
  update (id: string, data: MessageNotification, traceId?: string): Promise<void>
  updateAll(qkey: string, qvalue: any, setkey:string, setvalue: any, traceId?: string ): Promise<void>
  delete (id: string, traceId?: string): Promise<void>

  registerToken (email: string, token:string, traceId?: string): Promise<void>
  clearToken (email: string, traceId?: string): Promise<void>
  getTokenByEmail(email: string, traceId?: string): Promise<string[]>
}