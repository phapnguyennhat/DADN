import { useDeleteLogLight, useInfinityGetLogLight } from "@/hook/hookLog";
import Feather from "@expo/vector-icons/Feather";
import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { useRouter } from "expo-router";

export default function ListLogLight() {
  const { data, isLoading, refetch, hasNextPage, fetchNextPage } =
    useInfinityGetLogLight();

  const deleteLogLight = useDeleteLogLight();
  const router = useRouter();

  const onReachEnd = () => {
    if (hasNextPage && !isLoading) {
      fetchNextPage();
    }
  };
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
              pathname: "/log/LogLightDetail",
              params: { log: JSON.stringify(item) },
            });
          }}
        >
          <View>
            <Text className=" mb-[13px] font-bold text-[20px]">
              {item.createdAt}
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
            {item.lightStatus === "on" ? (
              <View className=" items-center gap-1">
                <Image source={require("./../assets/images/lighton.png")} />
                <Text className="text-[#10493F] text-2xl font-bold uppercase">
                  {item.lightStatus}
                </Text>
              </View>
            ) : (
              <View className=" items-center gap-1">
                <Image
                  className="size-[50px]"
                  source={require("./../assets/images/lightoff.png")}
                />
                <Text className="text-[#10493F] text-2xl font-bold uppercase">
                  {item.lightStatus}
                </Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log("Item to delete:", item);
              deleteLogLight.mutate(item.id);
            }}
            className="bg-gray-100 rounded-full p-2"
          >
            <Feather name="x" size={24} color="gray" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    />
  );
}
