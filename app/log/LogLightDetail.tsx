import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';

export default function LogLightDetail() {
	const { log } = useLocalSearchParams();
	const logJson: LogLight = JSON.parse(log as string);
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
					{logJson.createdAt}
				</Text>
			</View>

			<View className=" flex-1  items-center justify-center">
				{logJson.lightStatus === 'on' ?
					<Image
						className="size-[190px] "
						source={require('./../../assets/images/lighton.png')}
					/> :
					<Image
						className="  size-[150px] "
						source={require('./../../assets/images/lightoff.png')}
					/>
				}
			</View>

			<View className=" w-[96%] mb-[130px] px-[24px] py-[30px] rounded-[38px] mx-auto bg-[#fff]  items-center justify-center  ">
				<View className=" w-full mb-[20px]  flex-row items-center justify-between">
					<View className=" inline-flex mx-auto  flex-row items-center">
						<Text className="text-2xl font-bold   text-[#10493F]">Cường độ ánh sáng: </Text>
						<Text className=" ml-2 text-2xl font-bold   text-[#10493F]">
							{logJson.lightIntensity}
						</Text>

					</View>
				</View>

				<Text className=' mb-1 text-primary font-bold  text-2xl' >
					Trạng thái hoạt động:{' '}
					<Text className=" uppercase">{logJson.lightStatus}</Text>
				</Text>


			</View>
		</View>
	);
}
