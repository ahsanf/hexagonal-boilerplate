import { RestResponse } from "../entity/response"

export const dataToRestResponse = (data: any): RestResponse => {
  return {
    success: true,
    message: 'Success',
    data
  }
}

export const errorToRestResponse = (error: any): RestResponse => {
  return {
    success: false,
    message: error.toString(),
    data: null
  }
}