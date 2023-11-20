import { createLogger, transports, format } from "winston"
import { LogType } from "./entity"

let logTraceId: string = ''

const winstonLogger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({timestamp, level, message, metadata}) => {
          return `[${timestamp}] ${metadata.traceId} ${level}: ${message}`
        })
      )
    }),
    new transports.File({
      dirname: 'logs',
      filename: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}_api.log`,
      format: format.combine(format.json())
    })
  ],
  format: format.combine(format.metadata(), format.timestamp())
})

export const getLogTraceId = () => logTraceId
export const setLogTraceId = (id: string) => logTraceId = id

export const logger: LogType = {
  info (functionName: string, className: string, traceId?: string, message?: string) {
    const finalMessage = message ?? `call ${functionName} from ${className}`
    winstonLogger.info(finalMessage, {
      traceId: traceId ?? logTraceId
    })
  },
  warn (functionName: string, className: string, traceId?: string, message?: string) {
    const finalMessage = message ?? `call ${functionName} from ${className}`
    winstonLogger.warn(finalMessage, {
      traceId: traceId ?? logTraceId
    })
  },
  error (functionName: string, className: string, traceId?: string, message?: string) {
    const finalMessage = message ?? `call ${functionName} from ${className}`
    winstonLogger.error(finalMessage, {
      traceId: traceId ?? logTraceId
    })
  }
}