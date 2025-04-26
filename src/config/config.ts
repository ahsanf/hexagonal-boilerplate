import dotenv from "dotenv";

dotenv.config();

const MYSQL_DB_HOST = process.env.MYSQL_DB_HOST ?? ''
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME ?? ''
const MYSQL_DB_USERNAME = process.env.MYSQL_DB_USERNAME ?? ''
const MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD ?? ''
const MYSQL_DB_PORT = process.env.MYSQL_DB_PORT ?? ''

const APP_PORT = process.env.APP_PORT ?? ''
const APP_SALT = process.env.APP_SALT ?? ''
const APP_SALT_IV = process.env.APP_SALT_IV ?? ''
const APP_ENCRYPT_METHOD = process.env.APP_ENCRYPT_METHOD ?? ''
const API_VERSION = process.env.API_VERSION ?? ''
const APP_COOKIE_URL = process.env.APP_COOKIE_URL ?? ''
const APP_NAME = process.env.APP_NAME ?? ''

const MAIL_HOST = process.env.MAIL_HOST ?? ''
const MAIL_PORT = process.env.MAIL_PORT ?? ''
const MAIL_USER = process.env.MAIL_USER ?? ''
const MAIL_PASSWORD = process.env.MAIL_PASSWORD ?? ''
const MAIL_SECURE = process.env.MAIL_SECURE ?? ''

const SERVER_TOKEN_EXPRIRETIME = process.env.SERVER_TOKEN_EXPRIRETIME ?? 3600
const VALIDATION_CODE_EXPIRETIME = process.env.VALIDATION_CODE_EXPIRETIME ?? 900
const REFRESH_TOKEN_EXPIRETIME = process.env.REFRESH_TOKEN_EXPIRETIME ?? 86400

const MONGO_DB_HOST = process.env.MONGO_DB_HOST ?? ''
const MONGO_DB_USER = process.env.MONGO_DB_USER ?? ''
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD ?? ''

const REDIS_URL = process.env.REDIS_URL ?? ''
const REDIS_ENABLE = process.env.REDIS_ENABLE ?? false

const RABBIT_MQ_HOST = process.env.RABBIT_MQ_HOST ?? ''
const RABBIT_MQ_PORT = process.env.RABBIT_MQ_PORT ?? ''
const RABBIT_MQ_USER = process.env.RABBIT_MQ_USER ?? ''
const RABBIT_MQ_PASSWORD = process.env.RABBIT_MQ_PASSWORD ?? ''

const PG_HOST = process.env.PG_HOST ?? ''
const PG_PORT = process.env.PG_PORT ?? ''
const PG_USER = process.env.PG_USER ?? ''
const PG_PASSWORD = process.env.PG_PASSWORD ?? ''
const PG_DATABASE = process.env.PG_DATABASE ?? ''




const APP_CONFIG = {
  appPort: APP_PORT,
  appSalt: APP_SALT,
  appSaltIv: APP_SALT_IV,
  appEncryptMethod: APP_ENCRYPT_METHOD,
  apiVersion: API_VERSION,
  appCookieUrl: APP_COOKIE_URL,
  appName: APP_NAME,
  redisEnable: REDIS_ENABLE,
}

const SERVER_CONFIG = {
  tokenExpireTime: SERVER_TOKEN_EXPRIRETIME,
  validationCodeExpireTime: VALIDATION_CODE_EXPIRETIME,
  refreshTokenExpireTime: REFRESH_TOKEN_EXPIRETIME,
}

const MYSQL_CONFIG = {
  client: 'mysql',
  connection: {
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USERNAME,
    password: MYSQL_DB_PASSWORD,
    database: MYSQL_DB_NAME,
  },
  migrations: {
    tableName: 'knex_migrations',
    extension: 'ts',
  },
  debug: true,
};

const PG_CONFIG = {
  client: 'pg',
  connection: {
    host: PG_HOST,
    user: PG_USER,
    password: PG_PASSWORD,
    database: PG_DATABASE,
    port: PG_PORT || 5432,
  },
  migrations: {
    tableName: 'knex_migrations',
    extension: 'ts',
  },
  debug: true,
}

const MAIL_CONFIG = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  }
}

const MONGO_CONFIG = {
  host: MONGO_DB_HOST,
  user: MONGO_DB_USER,
  password: MONGO_DB_PASSWORD,
}

const REDIS_CONFIG = {
  url: REDIS_URL,
}

const RABBIT_MQ_CONFIG = {
  host: RABBIT_MQ_HOST,
  port: RABBIT_MQ_PORT,
  user: RABBIT_MQ_USER,
  password: RABBIT_MQ_PASSWORD,
}
export const config: any = {
  app: APP_CONFIG,
  server: SERVER_CONFIG,
  rabbitMq: RABBIT_MQ_CONFIG,
  database: {
    mysql : MYSQL_CONFIG,
    mongo: MONGO_CONFIG,
    redis: REDIS_CONFIG,
    pg: PG_CONFIG,
  },
  mail: MAIL_CONFIG,
};
