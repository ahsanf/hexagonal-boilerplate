import { MongoClient } from "mongodb"
import { config } from "../../../config/config"

let client: MongoClient

export const getMongoClient = (): MongoClient => client

export const initMongo = () => {
  const url: string  = `mongodb+srv://${config.database.mongo.user}:${config.database.mongo.password}@${config.database.mongo.host}`
  client = new MongoClient(url)
  client.connect()
}
