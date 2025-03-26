import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import TemperatureIcon from '../assets/images/temperature.svg';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function LogDetail() {
	const { log } = useLocalSearchParams();
	const logJson: Log = JSON.parse(log as string);
	const router = useRouter();

	return (
		<View className=" bg-[#EBECF2] pt-[23px]   flex-1">
			<View className=" px-[18px] flex-row items-center ">
				<TouchableOpacity onPress={() => router.back()}>
					<FontAwesome
						name="arrow-circle-left"
						size={30}
						color="#10493F"
					/>
				</TouchableOpacity>
				<Text className="  font-bold text-[25px] text-center mx-auto">
					{logJson.createAt}
				</Text>
			</View>

			<View className=" flex-1  items-center justify-center">
			{ logJson.pumpStatus ==='on'?	<Image
					className=" mx-auto size-[285px] "
					source={require('./../assets/images/rain.png')}
                /> :
                    <Image
                    className=" mx-auto size-[285px] "
					source={require('./../assets/images/sun.png')}
                    />
                 }
            </View>
            
			<View className=" w-[96%] mb-[130px] px-[24px] py-[30px] rounded-[38px] mx-auto bg-[#fff]  items-center justify-center  ">
				<View className=" w-full mb-[30px]  flex-row items-center justify-between">
					<View className=" inline-flex  flex-row items-center">
						<Image
							source={require('./../assets/images/greenTemperature.png')}
						/>
						<Text className=" ml-2 text-[40px] font-bold   text-[#10493F]">
							{logJson.temperature}
						</Text>
						<MaterialCommunityIcons
							name="temperature-celsius"
							size={34}
							color="#10493F"
						/>
					</View>

					<View className=" inline-flex flex-row items-center">
						<Image
							source={require('./../assets/images/greenHumidity.png')}
						/>
						<Text className=" ml-2 text-[40px] leading-[40px]   text-primary font-bold ">
							{logJson.humidity}%
						</Text>
					</View>
				</View>

				<Text className=' mb-1 text-primary font-bold  text-2xl' >
					Trạng thái hoạt động:{' '}
					<Text className=" uppercase">{logJson.pumpStatus}</Text>
                </Text>

                <Text className=' text-primary font-bold  text-2xl' >
					Mode:{' '}
					<Text className=" uppercase">{logJson.typeLog}</Text>
                </Text>
                
			</View>
		</View>
	);
}
