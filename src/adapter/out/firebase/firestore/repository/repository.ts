import { MessageFirestore } from "../entity/message";
import { FirestoreBaseRepository } from "./base_repository";
import * as admin from "firebase-admin"
import { snapshotToMessageFirestore } from "../util/converter";
import { FilterFirestore } from "../entity/filter";
import { StatsMongo } from "../entity/stats";

export class FirestoreRepository implements FirestoreBaseRepository{
  private collectionName = 'notifications'
  private perPage: number = 100

  async generateFilter (collection:admin.firestore.CollectionReference, limit:number, offset:number ,filter?: FilterFirestore):Promise<admin.firestore.QuerySnapshot<admin.firestore.DocumentData>> {
    let query = collection.where('title', '!=', '')
    if (filter !== undefined) {
      if(filter.isRead !== undefined){
        query = query.where('is_read', '==', filter.isRead)
      }
      if(filter.receiver !== undefined){
        query = query.where('receiver', '==', filter.receiver)
      }
    }
    return await query.limit(limit).offset(offset).orderBy('updated_at', 'desc').get()
  }

  async generateCountFilter (collection:admin.firestore.CollectionReference,filter?: FilterFirestore):Promise<number> {
    let query = collection.where('title', '!=', '')
    if (filter !== undefined) {
      if(filter.isRead !== undefined){
        query = query.where('is_read', '==', filter.isRead)
      }
      if(filter.receiver !== undefined){
        query = query.where('receiver', '==', filter.receiver)
      }
    }
    return (await query.count().get()).data().count
  }

  async findAll(perPage?: number | undefined, currentPage?: number | undefined, filter?:FilterFirestore, traceId?: string | undefined): Promise<MessageFirestore[]> {
    if (perPage) this.perPage = perPage
    const current = currentPage !== undefined ? currentPage : 1
    const skip: number = (current - 1) * this.perPage
    const db = admin.firestore()
    const collection = db.collection(this.collectionName)
    const snapshot = await this.generateFilter(collection, this.perPage, skip, filter)
    const results:MessageFirestore[] = []
    if (snapshot.empty) {
      return []
    }
    for(let i=0; i<snapshot.docs.length; i++){
      results.push(snapshotToMessageFirestore(snapshot.docs[i].id, snapshot.docs[i].data()))
    }
    return results
  }

  async findAllStats(perPage?: number | undefined, currentPage?: number | undefined, filter?:FilterFirestore, traceId?: string): Promise<StatsMongo> {
    if (perPage) this.perPage = perPage
    const current = currentPage !== undefined ? currentPage : 1
    const total: number = await this.findAllCount(filter, traceId)
    const totalPage: number = Math.ceil(total/this.perPage)
    return Promise.resolve({
      total_data: total,
      current_page: current,
      total_page: totalPage,
      per_page: this.perPage
    })
  }

  async findAllCount(filter?:FilterFirestore, traceId?: string): Promise<number> {
    const db = admin.firestore()
    const collection = db.collection(this.collectionName)
    return await this.generateCountFilter(collection, filter)
  }

  async findById(id:string, traceId?: string | undefined): Promise<MessageFirestore> {
    const db = admin.firestore()
    const snapshot = await db.collection(this.collectionName).doc(id).get()
    if (!snapshot.exists || snapshot === undefined) {
      throw new Error("EMPTY");
    }
    return snapshotToMessageFirestore(snapshot.id, snapshot.data()!)
  }

  async insert(data: MessageFirestore, traceId?: string | undefined): Promise<string> {
    const db = admin.firestore()
    delete data.id
    return (await db.collection(this.collectionName).add(data)).id
  }

  async update(id: string, data: MessageFirestore, traceId?: string | undefined): Promise<void> {
    const db = admin.firestore()
    await db.collection(this.collectionName).doc(id).update(data)
  }

  async updateAll(qKey: string, qValue: any, setKey:string, setValue:any, traceId?: string | undefined): Promise<void> {
    const db = admin.firestore()
    const query = await db.collection(this.collectionName).where(qKey, '==', qValue)
    await db.runTransaction(async (t: { get: (arg0: any) => any; update: (arg0: any, arg1: { [x: string]: any; }) => void; }) => {
      const docs = await t.get(query)
      docs.forEach((doc: { ref: any; }) => {
        t.update(doc.ref, {
          [setKey]: setValue
        })
      })
    })
  }

  async delete(id: string, traceId?: string | undefined): Promise<void> {
    const db = admin.firestore()
    await db.collection(this.collectionName).doc(id).delete()
  }

  async registerToken(email: string, token: string, traceId?: string | undefined): Promise<void> {
    const db = admin.firestore()
    let tokenMap = new Map<string, boolean>()
    const snapshot = await db.collection('fcm_tokens').doc(email).get()
    if (!snapshot.exists || snapshot === undefined) {
      tokenMap.set(token, true)
    } else {
      tokenMap = new Map(Object.entries(snapshot.data()!))
      tokenMap.set(token, true)
    }
    await db.collection('fcm_tokens').doc(email).set(Object.fromEntries(tokenMap.entries()))
  }

  async clearToken(email: string, traceId?: string | undefined): Promise<void> {
    const db = admin.firestore()
    let tokenMap = new Map<string, boolean>()
    await db.collection('fcm_tokens').doc(email).set(Object.fromEntries(tokenMap.entries()))
  }

  async getTokenByEmail(email: string, traceId?: string | undefined): Promise<string[]> {
    const db = admin.firestore()
    let tokenMap = new Map<string, boolean>()
    const snapshot = await db.collection('fcm_tokens').doc(email).get()
    if (!snapshot.exists || snapshot === undefined) {
      // do nothing
    } else {
      tokenMap = new Map(Object.entries(snapshot.data()!))
    }
    return Array.from(tokenMap.keys())
  }
}