import useMqtt from '@/hook/useMqtt';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import TemperatureIcon from '../assets/images/temperature.svg'
import HumidiryIcon from '../assets/images/humidity.svg'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function CurrentStatus() {
    const { pumpStatus, handleSetPumpStatus, humidityData, dhtData } =
        useMqtt();

    return (
        <View className="w-[390px] mx-auto h-[228px] bg-[#10493F] rounded-[24px] flex-row justify-center items-center gap-[29px]  ">
            {pumpStatus === '1' ? (
                <TouchableOpacity
                    onPress={() => handleSetPumpStatus('0')}
                    className=" rounded-full size-[128px] bg-white justify-center items-center "
                >
                    <Text className=" font-bold text-3xl text-[#10493F]">
                        ON
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => handleSetPumpStatus('1')}
                    className=" rounded-full size-[128px] bg-[#5AFCDF] justify-center items-center "
                >
                    <Text className=" font-bold text-3xl text-[#10493F]">
                        OFF
                    </Text>
                </TouchableOpacity>
            )}

            <View className=' ' >
                <View className="  flex-row items-center">
                    <TemperatureIcon/>
                    <Text className=" ml-2 text-[40px]   text-white">{dhtData}</Text>
                    <MaterialCommunityIcons
                        name="temperature-celsius"
                        size={34}
                        color="white"
                    />
                </View>

                <View className="  flex-row items-center">
                    <HumidiryIcon/>
                    <Text className=" ml-2 text-[40px]   text-white">{humidityData}%</Text>
                    
                </View>
            </View>
        </View>
    );
}
