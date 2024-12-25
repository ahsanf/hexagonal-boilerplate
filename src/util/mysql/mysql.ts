import knex from "knex"
import { config } from "src/config/config"

export const getMysqlClient = () => knex(config.database.mysql)

export const initMysql = async () => {
  try {
    knex(config.database.mysql)
    console.log("Connection has been established successfully.")
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}
