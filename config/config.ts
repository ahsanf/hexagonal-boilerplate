import dotenv from "dotenv";

dotenv.config();

const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "refreshtoken";
const MYSQL_USERNAME = process.env.MYSQL_USERNAME || "root";
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || "tarekAA123";
const MYSQL_HOST = process.env.MYSQL_HOST || "127.0.0.1";

const MYDATABASE = {
  host: MYSQL_HOST,
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};
const API_VERSION = process.env.API_VERSION;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || "3500";
const SERVER_TOKEN_EXPRIRETIME = process.env.SERVER_TOKEN_EXPRIRETIME || 3600;

const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "supersecret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "superrefresh";
const REFRESH_TOKEN_EXPIRETIME = process.env.REFRESH_TOKEN_EXPIRETIME || 86400;
const VALIDATION_CODE_EXPIRETIME =
  process.env.VALIDATION_CODE_EXPIRETIME || 900;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  apiVersion: API_VERSION,
  code: VALIDATION_CODE_EXPIRETIME,
  token: {
    expireTime: SERVER_TOKEN_EXPRIRETIME,
    secret: SERVER_TOKEN_SECRET,
    refresh: REFRESH_TOKEN_SECRET,
    refreshTokenTime: REFRESH_TOKEN_EXPIRETIME,
  },
};

export const config = {
  server: SERVER,
  database: MYDATABASE,
};
