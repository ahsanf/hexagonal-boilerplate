import { Filter } from "../../../../../domain/filter"
import { MessageNotification } from "../../../../../domain/message_notification"

export interface FCMBaseAdapter {
  send (token:string, data:MessageNotification, traceId?:string): Promise<void>
}