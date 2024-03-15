import type { Knex } from "knex";
import dotenv from 'dotenv'; 
import { config as appConfig } from "./config/config";
// Update with your config settings.
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: appConfig.database.mysql,

  staging: {},

  production: {}

};

module.exports = config;

