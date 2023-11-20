import type { Knex } from "knex";
import dotenv from 'dotenv'; 
// Update with your config settings.
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    migrations: {
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    debug: true,
  },

  staging: {},

  production: {}

};

module.exports = config;

