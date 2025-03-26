import { myApiConfig } from "./config/myApiConfig"

export const getLog =async (queryString: string) =>{
  const response = await myApiConfig.get<{count: number, logs: Log[]}>(`log?${queryString}`)
  return response.data
}

export const createLog =async (data: CreateLog) =>{
  const response = await myApiConfig.post('log', data)
  return response.data
}

export const deleteLog = async (id: string)=>{
  const response = await myApiConfig.delete(`log/${id}`)
  return response.data
}