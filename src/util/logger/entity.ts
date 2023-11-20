export type LogType = {
  info (functionName: string, className: string, traceId?: string, message?: string, ): void
  warn (functionName: string, className: string, traceId?: string, message?: string): void
  error (functionName: string, className: string, traceId?: string, message?: string): void
}