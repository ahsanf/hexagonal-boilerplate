import { config } from '@config'
import { Pool } from 'pg'
 
let client: Pool

export const getPostgresClient = (): Pool => client
const pool = new Pool({
  host: config.database.pg.connection.host,
  user: config.database.pg.connection.user,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export const initPostgres = () => {
  client = pool
  client.connect()
}