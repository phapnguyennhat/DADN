import usePump from '@/hook/usePump';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Text, TouchableOpacity, View } from 'react-native';
import TemperatureIcon from '../assets/images/temperature.svg';
import HumidiryIcon from '../assets/images/humidity.svg';

import {  useCreateLogPump } from '@/hook/hookLog';
import { useEffect, useMemo } from 'react';
import { calculate_heat_index } from '@/lib/util';


interface IProps {
    modePump: string
}
export default function CurrentPumpStatus({modePump}: IProps) {
	const { pumpStatus, handleSetPumpStatus, humidityData, dhtData } =
        usePump();
    
    const createLogPump = useCreateLogPump()

	useEffect(() => {
		if ( isNaN(+dhtData) || isNaN(+humidityData)) {
			return;
		}

		const temp_f = (+dhtData * 9) / 5 + 32;
		const heatIndex = calculate_heat_index(temp_f, +humidityData);
		console.log('current value', { heatIndex, dhtData, humidityData });
		if (heatIndex >= 90 && pumpStatus === '0' && modePump==='auto') {
            createLogPump.mutate({ humidity: +humidityData, temperature: +dhtData, typeLog: 'auto', pumpStatus: 'on' })
            handleSetPumpStatus('1')
            
		} else if (heatIndex < 90 && pumpStatus === '1' && modePump==='auto') {
            createLogPump.mutate({ humidity: +humidityData, temperature: +dhtData, typeLog: 'auto', pumpStatus: 'off' })
            handleSetPumpStatus('0')
		}
    }, [humidityData, dhtData, pumpStatus, modePump]);
    

    const disabled = useMemo(()=>(createLogPump.isPending || modePump==='auto'),[modePump, createLogPump.isPending])

	return (
		<View className="w-[390px]  mx-auto h-[228px] bg-[#10493F] rounded-[24px] flex-row justify-center items-center gap-[29px]  ">
			{pumpStatus === '1' ? (
				<TouchableOpacity
					disabled={disabled}
					onPress={() => {
						handleSetPumpStatus('0');
						createLogPump.mutate({
							humidity: +humidityData,
							pumpStatus: 'off',
							temperature: +dhtData,
							typeLog: 'manual',
						});
					}}
					className={` rounded-full size-[128px] bg-white justify-center items-center   ${
						disabled && 'opacity-60'
					}  `}
				>
					<Text className=" font-bold text-3xl text-[#10493F]">
						ON
					</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					disabled={disabled}
					onPress={() => {
                        handleSetPumpStatus('1');
                        createLogPump.mutate({humidity: +humidityData, pumpStatus: 'on', temperature: +dhtData, typeLog: 'manual'})
                        
					}}
					className={` rounded-full size-[128px] bg-[#5AFCDF] justify-center items-center  ${
						disabled && 'opacity-60'
					}  `}
				>
					<Text className=" font-bold text-3xl text-[#10493F]">
						OFF
					</Text>
				</TouchableOpacity>
			)}

			<View className=" ">
				<View className="  flex-row items-center">
					<TemperatureIcon />
					<Text className=" ml-2 text-[40px] font-bold   text-white">
						{dhtData}
					</Text>
					<MaterialCommunityIcons
						name="temperature-celsius"
						size={34}
						color="white"
					/>
				</View> 

				<View className="  flex-row items-center">
					<HumidiryIcon />
					<Text className=" ml-2 text-[40px]  font-bold  text-white">
						{humidityData}%
					</Text>
				</View>
			</View>
		</View>
	);
}
