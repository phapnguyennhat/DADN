import { getPumpStatus } from '@/api/adafruit';
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


