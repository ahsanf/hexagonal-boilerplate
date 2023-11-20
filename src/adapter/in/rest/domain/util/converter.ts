import { Stats } from "../../../../../domain/stats"
import { User } from "../../../../../domain/user"
import { UserRestRequest } from "../entity/request"
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

export const userRestRequestToUser = (data: UserRestRequest): User => {
  return {
    firstName: data.firstName ?? '', 
    lastName: data.lastName ?? '',
    email: data.email ?? '',
    password: data.password ?? '',
    isSubsNewLetter: data.isSubsNewLetter ?? false,
    regionId: data.regionId ?? 0,
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}