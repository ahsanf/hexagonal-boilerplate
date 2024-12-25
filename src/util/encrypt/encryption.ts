import { createCipheriv, createDecipheriv, createHash } from "crypto"
import { logger } from "../logger/logger";
import { config } from "src/config/config";

const secretKey: string = config.app.appSalt;
const secretKeyIv: string = config.app.appSaltIv;
const encryptMethod: string = config.app.appEncryptMethod;

if(secretKey === "" || secretKeyIv === "" || encryptMethod === "") {
  throw new Error('Secret key required')
}

const key = createHash("sha512")
  .update(secretKey)
  .digest("hex")
  .substring(0, 32);

const encryptIv = createHash("sha512")
  .update(secretKeyIv)
  .digest("hex")
  .substring(0, 16);

export const encryptData = async (data: string): Promise<string> => {
  logger.info(encryptData.name, 'encryption')
  const cipher = createCipheriv(encryptMethod, key, encryptIv)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')

  return Buffer.from(encrypted).toString('base64')

}

export const decryptData = async (encryptedData: string): Promise<string> => {
  logger.info(decryptData.name, 'encryption')
  const buff = Buffer.from(encryptedData, 'base64')
  const decipher = createDecipheriv(encryptMethod, key, encryptIv)
  let decrypted = decipher.update(buff.toString('utf8'), 'hex', 'utf8')
  decrypted += decipher.final('utf8')

  return decrypted
}
