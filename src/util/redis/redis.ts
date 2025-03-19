import { createClient } from "redis";
import { config } from "@config";
import { logger } from "../logger/logger";
import { ApplicationError } from "../error/application_error";
import { HttpError } from "@util/error/type/http_error"; 

const redisUrl = config.database.redis.url;
const isRedisEnable = config.app.redisEnable === 'true';
export const client = isRedisEnable === true ? createClient(redisUrl ? { url: redisUrl, pingInterval: 3000 } : undefined) : null;

export const initRedis = () => {
  if (isRedisEnable && client) {
    client.connect();
    client.on("connect", () => {
      console.log("Redis client connected");
    });

    client.on("error", (err:any ) => {
      console.log("Something went wrong " + err);
    });
  } else {
    console.log("Redis client is disabled");
  }
};

export const cacheData = async (key: string, data: any, expiredTime?: number): Promise<void> => {
  logger.info(cacheData.name, 'RedisUtil', undefined, `Caching data for key: ${key}`);
  if(!isRedisEnable || client === null) return
  let generateExpired = {}

  if (expiredTime) {
    generateExpired = { EX: expiredTime }
  }
  if(client === null) return
  await client.set(key, JSON.stringify(data), generateExpired);
}

export const getFromCache = async (key: string): Promise<any> => {
  logger.info(getFromCache.name, 'RedisUtil', undefined, `Getting data from cache for key: ${key}`);
  if(!isRedisEnable || client === null) return null
  const data: any = await client
    .get(key)
    .catch((err: any) => {
      console.log(err);
      throw new ApplicationError(HttpError().INTERNAL_SERVER_ERROR);
  });

  if (data) {
    return Promise.resolve(JSON.parse(data));
  }

  return null
}

export const delCache = async (key: string) => {
  logger.info(delCache.name, 'RedisUtil', undefined, `Deleting data from cache for key: ${key}`);
  if(!isRedisEnable || client === null) return
  const allKeys: string[] = await client.keys(`${key}*`);
  for (let key of allKeys) {
    logger.info(delCache.name, 'RedisUtil', undefined, `Deleting data from cache for key: ${key}`);
    client.del(key);
  }
};
