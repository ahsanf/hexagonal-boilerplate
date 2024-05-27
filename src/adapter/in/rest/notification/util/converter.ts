import { Stats } from "../../../../../domain/stats"
import { RestResponse, StatsRestResponse } from "../entity/response"

export const dataToRestResponse = (data: any, stats?: Stats): RestResponse => {
  if(stats !== undefined){
    return {
      success: true,
      message: 'Success',
      data,
      stats: statsToStatsRestResponse(stats),
    }
  }else{
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
    message: error.toString(),
    data: null
  }
}

export const statsToStatsRestResponse = (data: Stats): StatsRestResponse => {
  return {
    total_data: data.totalData,
    total_page: data.totalPage,
    current_page: data.currentPage,
    per_page: data.perPage
  }
}