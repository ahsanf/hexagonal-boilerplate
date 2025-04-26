import { config } from '@config'
import knex, { Knex } from 'knex'

let client: Knex

export const getPostgresClient = (): Knex => {
  if (!client) {
    throw new Error('Knex client has not been initialized. Call initPostgres() first.')
  }
  return client
}

export const initPostgres = async (): Promise<void> => {
  client = knex({
    client: 'pg',
    connection: {
      host: config.database.pg.connection.host,
      user: config.database.pg.connection.user,
      password: config.database.pg.connection.password,
      database: config.database.pg.connection.database,
      port: config.database.pg.connection.port || 5432,
    },
    pool: {
      min: 2,
      max: 20,
      idleTimeoutMillis: 30000,
      createTimeoutMillis: 2000,
      acquireTimeoutMillis: 2000,
    },
  })

  try {
    await client.raw('SELECT 1+1 AS result')
    console.log('✅ Connected to PostgreSQL via Knex successfully.')
  } catch (err) {
    console.error('❌ Failed to connect to PostgreSQL via Knex:', err)
    throw err
  }
}
