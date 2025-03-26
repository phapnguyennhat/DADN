import { useDeleteLog, useGetLog } from '@/hook/hookLog';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

export default function ListLog() {
	const { result, isLoading, refetch } = useGetLog({ page: 1, limit: 10 });
	const logs = result?.logs;
	const deleteLog = useDeleteLog()
	const router= useRouter()
	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			refreshing={isLoading}
			data={logs}
			onRefresh={() => refetch()}
			renderItem={({ item, index }) => (
				<TouchableOpacity
					onPress={() => router.push({
						pathname: '/LogDetail',
						params: {log: JSON.stringify(item)}
					})}
					className="mb-[17px] flex-row items-center px-[16px] py-[16px] justify-between w-[97%] mx-auto rounded-[11px]  bg-white "
					key={index}
				>
					<View>
						<Text className=" mb-[13px] font-bold text-[20px]">
							{item.createAt}
						</Text>

						<View className=" flex-row items-center justify-between">
							<View className=" inline-flex flex-row items-center">
								<Text className=" font-bold text-2xl">
									{item.temperature}
								</Text>
								<MaterialCommunityIcons
									name="temperature-celsius"
									size={24}
									color="black"
								/>
								<Text className=" font-bold text-2xl">
									, {item.humidity}%
								</Text>
							</View>

							<Text className=" text-[#10493F] text-2xl font-bold uppercase">
								{item.pumpStatus}
							</Text>
						</View>
					</View>
					{item.pumpStatus === 'off' ? (
						<Image source={require('./../assets/images/sun.png')} />
					) : (
						<Image
							source={require('./../assets/images/rain.png')}
						/>
					)}
					<TouchableOpacity className=' bg-gray-100 rounded-full p-1'  onPress={()=>deleteLog.mutate(item.id)} >
						<Feather name="x" size={24} color="gray" />
					</TouchableOpacity>
				</TouchableOpacity>
			)}
		/>
	);
}
