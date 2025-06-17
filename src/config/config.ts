import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, fallback: any = ''): string => process.env[key] ?? fallback;
const getEnvInt = (key: string, fallback: number): number => parseInt(process.env[key] ?? '') || fallback;
const getEnvBool = (key: string, fallback: boolean = false): boolean => process.env[key] != null ? process.env[key].toLowerCase() === 'true' : fallback;

const APP_CONFIG = {
  appPort: getEnv('APP_PORT'),
  appSalt: getEnv('APP_SALT'),
  appSaltIv: getEnv('APP_SALT_IV'),
  appEncryptMethod: getEnv('APP_ENCRYPT_METHOD'),
  apiVersion: getEnv('API_VERSION'),
  appCookieUrl: getEnv('APP_COOKIE_URL'),
  appName: getEnv('APP_NAME'),
  redisEnable: getEnvBool('REDIS_ENABLE'),
};

const SERVER_CONFIG = {
  tokenExpireTime: getEnvInt('SERVER_TOKEN_EXPRIRETIME', 3600),
  validationCodeExpireTime: getEnvInt('VALIDATION_CODE_EXPIRETIME', 900),
  refreshTokenExpireTime: getEnvInt('REFRESH_TOKEN_EXPIRETIME', 86400),
};

const MYSQL_CONFIG = {
  client: 'mysql',
  connection: {
    host: getEnv('MYSQL_DB_HOST'),
    user: getEnv('MYSQL_DB_USERNAME'),
    password: getEnv('MYSQL_DB_PASSWORD'),
    database: getEnv('MYSQL_DB_NAME'),
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
    host: getEnv('PG_HOST'),
    user: getEnv('PG_USER'),
    password: getEnv('PG_PASSWORD'),
    database: getEnv('PG_DATABASE'),
    port: getEnvInt('PG_PORT', 5432),
  },
  migrations: {
    tableName: 'knex_migrations',
    extension: 'ts',
  },
  debug: true,
};

const MAIL_CONFIG = {
  host: getEnv('MAIL_HOST'),
  port: getEnv('MAIL_PORT'),
  auth: {
    user: getEnv('MAIL_USER'),
    pass: getEnv('MAIL_PASSWORD'),
  },
};

const MONGO_CONFIG = {
  host: getEnv('MONGO_DB_HOST'),
  user: getEnv('MONGO_DB_USER'),
  password: getEnv('MONGO_DB_PASSWORD'),
  preUrl: getEnv('MONGO_DB_PRE_URL', 'mongodb+srv://'),
};

const MONGO_URL = `${MONGO_CONFIG.preUrl}${MONGO_CONFIG.user}:${MONGO_CONFIG.password}@${MONGO_CONFIG.host}`;

const REDIS_CONFIG = {
  url: getEnv('REDIS_URL'),
};

const RABBIT_MQ_CONFIG = {
  host: getEnv('RABBIT_MQ_HOST'),
  port: getEnv('RABBIT_MQ_PORT'),
  user: getEnv('RABBIT_MQ_USER'),
  password: getEnv('RABBIT_MQ_PASSWORD'),
};

export const config = {
  app: APP_CONFIG,
  server: SERVER_CONFIG,
  rabbitMq: RABBIT_MQ_CONFIG,
  database: {
    mysql: MYSQL_CONFIG,
    mongo: {
      ...MONGO_CONFIG,
      url: MONGO_URL,
    },
    redis: REDIS_CONFIG,
    pg: PG_CONFIG,
  },
  mail: MAIL_CONFIG,
};

