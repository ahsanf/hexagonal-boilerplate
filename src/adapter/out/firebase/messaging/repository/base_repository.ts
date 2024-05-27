import { MessageFCM } from "../entity/message"

export interface FCMBaseRepository {
    send (token:string, data:MessageFCM, traceId?:string): Promise<void>
}