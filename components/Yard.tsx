import { Text, View } from "react-native";
import YardCard from "./YardCard";
import { useInfinityGetLogPump } from "@/hook/hookLog";

export default function Yard() {
  const { data, isLoading, refetch, hasNextPage, fetchNextPage } =
    useInfinityGetLogPump();
  return (
    <View className="mx-[20px] mb-[20px]">
      <Text className="text-2xl mb-6 font-bold">My Yard</Text>
      <YardCard logPump={data?.pages[0].data[0]} />
    </View>
  );
}
