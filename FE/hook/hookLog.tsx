import {   getLogPump, getLogLight, createLogPump, deleteLogPump, createLogLight, deleteLogLight } from "@/api/log"
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Toast } from "toastify-react-native"

export const useInfinityGetLogPump =  () =>{
  return useInfiniteQuery({
    queryKey: ['logPump'],
    queryFn: ({ pageParam }) => getLogPump({pageParam, limit: 10}),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
})
} 

export const useInfinityGetLogLight =  () =>{
  return useInfiniteQuery({
    queryKey: ['logLight'],
    queryFn: ({ pageParam }) => getLogLight({pageParam, limit: 10}),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })
}


export const useCreateLogPump = ()=>{
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createLogPump,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey: ['logPump']})
    },
    onError: (error: any) =>{
      Toast.error(error.response.data.message || 'Network Error')
    }
  })
  return mutation
}

export const useCreateLogLight = ()=>{
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createLogLight,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey: ['logLight']})
    },
    onError: (error: any) =>{
      Toast.error(error.response.data.message || 'Network Error')
    }
  })
  return mutation
} 



export const useDeleteLogPump = ()=>{
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteLogPump,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey: ['logPump']})
    },
    onError: (error: any) =>{
      Toast.error(error.response.data.message || 'Network Error')
    }
  })
  return mutation
}

export const useDeleteLogLight = ()=>{
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteLogLight,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey: ['logLight']})
    },
    onError: (error: any) =>{
      Toast.error(error.response.data.message || 'Network Error')
    }
  })
  return mutation
}
