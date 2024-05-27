import * as admin from "firebase-admin"
import { MessageFCM } from "../entity/message"
import { MessageNotification } from "../../../../../domain/message_notification"

export const domainToEntity = (data:MessageNotification):MessageFCM => {
  return {
    id: data.id,
    title: data.title,
    subtitle: data.subtitle,
    image: data.image,
    content: data.content,
    url: data.url,
    sender: data.sender,
    receiver: data.receiver,
    destination: data.destination,
    reference_id: data.referenceId
  }
}