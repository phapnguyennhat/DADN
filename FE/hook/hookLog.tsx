import { createLog, deleteLog, getLog } from "@/api/log"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useGetLog =  (queryPagination: QueryPagination) =>{
  const searchParams = new URLSearchParams(queryPagination as any)
  const queryString = searchParams.toString()
  
  const {data: result, isLoading, isError, error, refetch} = useQuery({
    queryFn: ()=>getLog(queryString),
    queryKey: ['log', queryString]
  })

  if(isError){
    Toast.error((error as any).response.data.message || 'Network Error')
  }

  return {result, isLoading, refetch}
} 

export const useCreateLog = ()=>{
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createLog,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey: ['log']})
    },
    onError: (error: any) =>{
      Toast.error(error.response.data.message || 'Network Error')
    }
  })
  return mutation
}

export const useDeleteLog = ()=>{
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteLog,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey: ['log']})
    },
    onError: (error: any) =>{
      Toast.error(error.response.data.message || 'Network Error')
    }
  })
  return mutation
}