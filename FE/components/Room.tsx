import { useInfinityGetLogLight } from "@/hook/hookLog";
import { View, Text } from "react-native";
import RoomCard from "./RoomCard";

export default function Room() {
  const { data, isLoading, refetch, hasNextPage, fetchNextPage } =
    useInfinityGetLogLight();
  return (
    <View className="mx-[20px] mb-[20px]">
      <Text className="text-2xl mb-6 font-bold">My Room</Text>
      <RoomCard logLight={data?.pages[0].data[0]} />
    </View>
  );
}
