import { FilterFirestore } from "../entity/filter"
import { MessageFirestore } from "../entity/message"
import { StatsMongo } from "../entity/stats"

export interface FirestoreBaseRepository {
    findAll(perPage?: number | undefined, currentPage?: number | undefined, filter?:FilterFirestore, traceId?: string): Promise<MessageFirestore[]>
    findAllStats(perPage?: number | undefined, currentPage?: number | undefined, filter?:FilterFirestore, traceId?: string): Promise<StatsMongo>
    findAllCount(filter?:FilterFirestore, traceId?: string): Promise<number>
    findById(id:string, traceId?: string): Promise<MessageFirestore>
    insert(data:MessageFirestore, traceId?: string): Promise<string>
    update(id:string, data:MessageFirestore, traceId?: string): Promise<void>
    updateAll(qKey: string, qValue: any, setKey:string, setValue:any, traceId?: string | undefined): Promise<void>
    delete(id:string, traceId?: string): Promise<void>

    registerToken (email: string, token:string, traceId?: string): Promise<void>
    clearToken (email: string, traceId?: string): Promise<void>
    getTokenByEmail(email: string, traceId?: string): Promise<string[]>
}