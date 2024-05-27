import { logger } from "../../util/logger/logger";
import { MessageNotification } from "../../domain/message_notification";
import { FirestoreBaseAdapter } from "../../adapter/out/firebase/firestore/adapter/base_adapter";
import { FirestoreAdapter } from "../../adapter/out/firebase/firestore/adapter/adapter";
import { NotificationUseCase } from "../port/out/notification_use_case";
import { Filter } from "../../domain/filter";
import { FCMBaseAdapter } from "../../adapter/out/firebase/messaging/adapter/base_adapter";
import { FCMAdapter } from "../../adapter/out/firebase/messaging/adapter/adapter";
import { Stats } from "../../domain/stats";

export class NotificationService implements NotificationUseCase{
  private firestoreAdapter:FirestoreBaseAdapter
  private fcmAdapter:FCMBaseAdapter

  constructor(){
    this.firestoreAdapter = new FirestoreAdapter()
    this.fcmAdapter = new FCMAdapter()
  }
  async getAll(filter:Filter, perPage?: number | undefined, currentPage?: number | undefined, traceId?: string | undefined): Promise<MessageNotification[]> {
    logger.info(this.getAll.name, NotificationService.name, traceId)
    return await this.firestoreAdapter.findAll(traceId, perPage, currentPage, filter)
  }
  async getAllStats(filter:Filter, perPage?: number | undefined, currentPage?: number | undefined, traceId?: string | undefined): Promise<Stats> {
    logger.info(this.getAllStats.name, NotificationService.name, traceId)
    return await this.firestoreAdapter.findAllStats(traceId, perPage, currentPage, filter)
  }
  async getAllCount (filter:Filter, traceId?:string):Promise<number> {
    logger.info(this.getAllCount.name, NotificationService.name, traceId)
    return await this.firestoreAdapter.findAllCount(traceId, filter)
  }
  async getById(id: string, traceId?: string | undefined): Promise<MessageNotification> {
    logger.info(this.getById.name, NotificationService.name, traceId)
    return await this.firestoreAdapter.findById(id, traceId)
  }
  async add(data: MessageNotification, traceId?: string | undefined): Promise<string> {
    logger.info(this.add.name, NotificationService.name, traceId)
    if (data.isMuted === undefined || data.isMuted === false) {
      console.log('push notif is enabled, sending...')
      const tokens = await this.firestoreAdapter.getTokenByEmail(data.receiver, traceId)
      for(let i=0; i<tokens.length; i++){
        this.fcmAdapter.send(tokens[i], data)
      }
    }
    return await this.firestoreAdapter.insert({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    }, traceId)
  }
  async edit(data: MessageNotification, traceId?: string | undefined): Promise<void> {
    logger.info(this.edit.name, NotificationService.name, traceId)
    const lastData = await this.firestoreAdapter.findById(data.id)
    return await this.firestoreAdapter.update(data.id, {
      ...data,
      createdAt: new Date(lastData.createdAt),
      updatedAt: new Date()
    }, traceId)
  }
  async readAll (receiver:string, traceId?:string):Promise<void> {
    logger.info(this.readAll.name, NotificationService.name, traceId)
    return await this.firestoreAdapter.updateAll('receiver', receiver, 'is_read', true, traceId)
  }
  async remove(id: string, traceId?: string | undefined): Promise<void> {
    logger.info(this.remove.name, NotificationService.name, traceId)
    return await this.firestoreAdapter.delete(id, traceId)
  }
}