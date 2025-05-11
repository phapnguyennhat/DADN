import { getLightData, getPumpStatus } from '@/api/adafruit';
import { useQuery } from '@tanstack/react-query';
import { Toast } from 'toastify-react-native';

export const useGetPumpStatus = () => {
    const {
        data: pumpStatus,
        isLoading,
        isError,
        error,
    } = useQuery({ queryFn: getPumpStatus, queryKey: ['pump'] });
    
    if(isError){
      Toast.error((error as any).response.data.message || 'Network error')
    }

    return {pumpStatus, isLoading}
};


export const useGetLedStatus = () => {
  return useQuery({
    queryFn: getLightData,
    queryKey: ['lightStatus'],
    initialData: 'N/A',
  })
}

export const useGetLightData = () => {
  return useQuery({
    queryFn: getLightData,
    queryKey: ['lightData'],
    initialData: 'N/A',
  })
}




