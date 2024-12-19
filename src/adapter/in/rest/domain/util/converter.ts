import { Stats } from "@domain/stats"
import { Domain } from "@domain/domain"
import { DomainRequest } from "../entity/request"
import { RestResponse } from "../entity/response"

export const dataToRestResponse = (data: any, stats?: Stats): RestResponse => {
  if (stats !== undefined) {
    return {
      success: true,
      message: 'Success',
      data,
      stats: stats,
    }
  } else {
    return {
      success: true,
      message: 'Success',
      data
    }
  }
}

export const errorToRestResponse = (error: any): RestResponse => {
  return {
    success: false,
    message: error.toString()
  }
}

export const requestToDomain = (request: DomainRequest): Domain => {
  throw new Error('Method Not implemented')
}
