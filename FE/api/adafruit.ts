import { FEED_PUMP } from "@/common/constant"
import { adafruitConfig } from "./config/adafruitConfig"

export const getPumpStatus = async () =>{
  const response = await adafruitConfig.get('feeds/pump/data/last')
  return response.data.value  as string
}

export const getDhtData = async ()=>{
  const response = await adafruitConfig.get('feeds/dht20/data/last')
  return response.data.value as string
}

export const  getHumidityData = async ()=>{
  const response = await adafruitConfig.get('feeds/soil-humidity/data/last')
  return response.data.value as string
}

