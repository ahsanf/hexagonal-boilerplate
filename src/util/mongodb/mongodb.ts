import { MongoClient } from "mongodb"
import { config } from "src/config/config"

let client: MongoClient

export const getMongoClient = (): MongoClient => client

export const initMongo = () => {
  client = new MongoClient(config.database.mongo.url)
  client.connect()
}
