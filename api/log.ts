import { myApiConfig } from "./config/myApiConfig"



export const getLogPump = async ({pageParam, limit}:{pageParam: number, limit:number}) =>{
  const response = await myApiConfig.get<{ data: LogPump[], currentPage: number, nextPage: number | null, count: number}>(`log/pump?page=${pageParam}&limit=${limit}`)
  return response.data
}

export const getLogLight = async ({pageParam, limit}:{pageParam: number, limit:number}) =>{
  const response = await myApiConfig.get<{ data: LogLight[], currentPage: number, nextPage: number | null, count: number}>(`log/light?page=${pageParam}&limit=${limit}`)
  return response.data
}

export const createLogPump = async (data: CreateLogPump) =>{
  const response = await myApiConfig.post('log/pump', data)
  return response.data
}

export const createLogLight = async (data: CreateLogLight) =>{
  const response = await myApiConfig.post('log/light', data)
  return response.data
}

export const deleteLogPump = async (id: string)=>{
  const response = await myApiConfig.delete(`log/pump/${id}`)
  return response.data
}

export const deleteLogLight = async (id: string)=>{
  const response = await myApiConfig.delete(`log/light/${id}`)
  return response.data
}