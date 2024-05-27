import { Filter } from "../../../../../domain/filter"
import { MessageNotification } from "../../../../../domain/message_notification"
import { Stats } from "../../../../../domain/stats"
import { FirestoreBaseRepository } from "../repository/base_repository"
import { FirestoreRepository } from "../repository/repository"
import { domainToEntity, entityToDomain, filterToFilterFirestore, statsMongoToStats } from "../util/converter"
import { FirestoreBaseAdapter } from "./base_adapter"

export class FirestoreAdapter implements FirestoreBaseAdapter {
  private repository: FirestoreBaseRepository

  constructor () {
    this.repository = new FirestoreRepository()
  }

  async findAll(traceId?: string | undefined, perPage?: number | undefined, currentPage?: number | undefined, filter?: Filter | undefined): Promise<MessageNotification[]> {
    const results = await this.repository.findAll(perPage, currentPage, filter ? filterToFilterFirestore(filter) : undefined, traceId)
    const final:MessageNotification[] = []
    for(let i=0; i<results.length; i++){
      final.push(entityToDomain(results[i]))
    }
    return final
  }
  async findAllStats (traceId?: string, perPage?:number, currentPage?:number, filter?:Filter): Promise<Stats> {
    const results = await this.repository.findAllStats(perPage, currentPage, filter ? filterToFilterFirestore(filter) : undefined, traceId)
    return statsMongoToStats(results)
  }
  async findAllCount (traceId?: string, filter?:Filter): Promise<number> {
    const results = await this.repository.findAllCount(filter ? filterToFilterFirestore(filter) : undefined, traceId)
    return results
  }
  async findById(id: string, traceId?: string | undefined): Promise<MessageNotification> {
    const result = await this.repository.findById(id, traceId)
    return entityToDomain(result)
  }
  async insert(data: MessageNotification, traceId?: string | undefined): Promise<string> {
    return await this.repository.insert(domainToEntity(data), traceId)
  }
  async update(id: string, data: MessageNotification, traceId?: string | undefined): Promise<void> {
    return await this.repository.update(id, domainToEntity(data), traceId)
  }
  async updateAll(qkey: string, qvalue: any, setkey:string, setvalue: any, traceId?: string ): Promise<void> {
    return await this.repository.updateAll(qkey, qvalue, setkey, setvalue, traceId)
  }
  async delete(id: string, traceId?: string | undefined): Promise<void> {
    return await this.repository.delete(id, traceId)
  }
  async registerToken(email: string, token: string, traceId?: string | undefined): Promise<void> {
    return await this.repository.registerToken(email, token, traceId)
  }
  async clearToken(email: string, traceId?: string | undefined): Promise<void> {
    return await this.repository.clearToken(email, traceId)
  }
  async getTokenByEmail(email: string, traceId?: string): Promise<string[]> {
    return await this.repository.getTokenByEmail(email, traceId)
  }
}