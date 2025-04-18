import { useDeleteLogLight, useInfinityGetLogLight } from "@/hook/hookLog";
import Feather from "@expo/vector-icons/Feather";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import LightOn from "../assets/images/lighton.svg";
import LightOff from "../assets/images/lightoff.svg";
import { useRouter } from "expo-router";

export default function ListLogLight() {
    const { data, isLoading, refetch, hasNextPage, fetchNextPage } = useInfinityGetLogLight()
    
    const deleteLogLight = useDeleteLogLight()
    const router = useRouter()

    const onReachEnd = () => {
        if (hasNextPage && !isLoading) {
            fetchNextPage()
        }
    }
    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            refreshing={isLoading}
            data={data?.pages.flatMap((page) => page.data)}
            onRefresh={() => refetch()}
            onEndReached={onReachEnd}
            
            renderItem={({ item, index }) => (
                <TouchableOpacity
                    className="mb-[17px] flex-row items-center px-[16px] py-[16px] justify-between w-[97%] mx-auto rounded-[11px]  bg-white "
                    key={index}
                    onPress={() => {
                        router.push({
                            pathname: '/LogLightDetail',
                            params: { log: JSON.stringify(item) }
                        })
                    }}
                >
                    <View>
                        <Text className=" mb-[13px] font-bold text-[20px]">
                            {item.createAt}
                        </Text>

                        <View className=" flex-row items-center justify-between">
                            <View className=" inline-flex flex-row items-center">
                                <Text className=" font-bold text-xl">
                                    Cường độ ánh sáng: {item.lightIntensity}
                                </Text>
                               
                            </View>

                           
                        </View>
                    </View>

                    <View>
                        {item.lightStatus === 'on' ? (
                            <View className=" items-center gap-1">
                            <LightOn width={50} height={50} />
                            <Text className="text-[#10493F] text-2xl font-bold uppercase">
                                {item.lightStatus}
                            </Text>
                            </View>
                        ) : (
                                <View className=" items-center gap-1">
                                    <LightOff width={50} height={50} />
                                    <Text className="text-[#10493F] text-2xl font-bold uppercase">
                                        {item.lightStatus}
                                    </Text>
                                </View>
                        )}
                    </View>

                    <TouchableOpacity
                        onPress={() => deleteLogLight.mutate(item.id)}
                        className="bg-gray-100 rounded-full p-2"
                    >
                        <Feather name="x" size={24} color="gray" />
                    </TouchableOpacity>
                </TouchableOpacity>
            )}
        />
    )
    
    
}