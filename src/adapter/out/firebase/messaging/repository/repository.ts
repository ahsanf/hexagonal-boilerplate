import { App } from "firebase-admin/app";
import { FCMBaseRepository } from "./base_repository";
import * as admin from "firebase-admin"
import { Message } from "firebase-admin/lib/messaging/messaging-api";
import { MessageFCM } from "../entity/message";

export class FCMRepository implements FCMBaseRepository{
  async send (token:string, data:MessageFCM, traceId?:string) {
    const fcm = admin.messaging()
    data = {
      ...data,
      id: data.id !== undefined ? data.id : ''
    }
    const message:Message = {
      token,
      data,
      notification: {
        title: data.title,
        body: data.content,
        imageUrl: data.image !== '' ? data.image : undefined
      }
    }
    const result = await fcm.send(message)
  }
}