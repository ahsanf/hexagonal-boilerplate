import { RestResponse } from "@domain/rest_response"
import { Stats } from "@domain/stats"

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

export const removeUndefinedField = (data: any) => {
  Object.keys(data).forEach(key => data[key] === undefined ? delete data[key] : {});
  return data
}