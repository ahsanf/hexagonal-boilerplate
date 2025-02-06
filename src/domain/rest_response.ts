export type RestResponse = {
  success: boolean
  message: string
  data?: any
  stats?: StatsRestResponse
}

export type StatsRestResponse = {
  totalData: number,
  currentPage: number,
  totalPage: number,
  perPage: number
}