import * as admin from "firebase-admin"
import { MessageFirestore } from "../entity/message"
import { Filter } from "../../../../../domain/filter"
import { FilterFirestore } from "../entity/filter"
import { MessageNotification } from "../../../../../domain/message_notification"
import { StatsMongo } from "../entity/stats"
import { Stats } from "../../../../../domain/stats"

export const snapshotToMessageFirestore = (id: string, data:admin.firestore.DocumentData): MessageFirestore => {
  return {
    id: id,
    title: data.title,
    subtitle: data.subtitle,
    image: data.image,
    content: data.content,
    is_read: data.is_read,
    url: data.url,
    sender: data.sender,
    receiver: data.receiver,
    destination: data.destination,
    reference_id: data.reference_id,
    type: data.type,
    created_at: data.created_at.toDate(),
    updated_at: data.updated_at.toDate(),
  }
}

export const statsMongoToStats = (data: StatsMongo): Stats => {
  return {
    totalData: data.total_data,
    totalPage: data.total_page,
    currentPage: data.current_page,
    perPage: data.per_page 
  }
}

export const domainToEntity = (data:MessageNotification):MessageFirestore => {
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    image: data.image,
    content: data.content,
    is_read: data.isRead,
    url: data.url,
    sender: data.sender,
    receiver: data.receiver,
    destination: data.destination,
    reference_id: data.referenceId,
    type: data.type,
    created_at: data.createdAt,
    updated_at: data.updatedAt,
  }
}

export const entityToDomain = (data:MessageFirestore):MessageNotification => {
  return {
    id: data.id !== undefined ? data.id : '',
    title: data.title,
    subtitle: data.subtitle,
    image: data.image,
    content: data.content,
    isRead: data.is_read,
    url: data.url,
    sender: data.sender,
    destination: data.destination,
    referenceId: data.reference_id,
    receiver: data.receiver,
    type: data.type,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  }
}

export const filterToFilterFirestore = (filter:Filter):FilterFirestore => {
  return {
    query: filter.query,
    isRead: filter.isRead,
    receiver: filter.receiver
  }
}