export interface RegistrationUseCase{
  register (email:string, token:string, traceId?:string):Promise<void>
  clear (email:string, traceId?:string):Promise<void>
}