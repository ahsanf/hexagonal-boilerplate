export interface RestResponse{
  success: boolean
  message: string
  data: any
  stats?: StatsRestResponse
}

export type StatsRestResponse = {
  total_data: number,
  current_page: number,
  total_page: number,
  per_page: number
}