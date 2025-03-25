import { getLog } from "@/api/log"
import { useQuery } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useGetLog =  async(queryPagination: QueryPagination) =>{
  const searchParams = new URLSearchParams(queryPagination as any)
  const queryString = searchParams.toString()
  
  const {data: result, isLoading, isError, error} = useQuery({
    queryFn: ()=>getLog(queryString),
    queryKey: ['log', queryString]
  })

  if(isError){
    Toast.error((error as any).response.data.message || 'Network Error')
  }

  return {result, isLoading}
} 