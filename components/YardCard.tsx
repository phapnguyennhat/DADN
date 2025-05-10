import { Image, View, Text, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";

interface IProps {
  logPump: LogPump | undefined;
}
export default function YardCard({ logPump }: IProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/(tabs)/pump")}
      className="  border-2 border-primary rounded-xl overflow-hidden"
    >
      {logPump?.pumpStatus === "off" ? (
        <Image
          source={require("../assets/images/yard_sun.jpg")}
          className="w-full h-[170px] object-cover"
        />
      ) : (
        <Image
          source={require("../assets/images/yard_rain.jpg")}
          className="w-full h-[170px] object-cover"
        />
      )}
      <View className=" p-4 flex flex-col gap-2">
        <Text className=" font-bold text-xl">Sân nhà của tôi</Text>

        <View className="flex-row items-center gap-2">
          <Feather name="map-pin" size={24} color="black" />
          <Text className=" text-sm">123 Đường ABC, Quận 1, Hồ Chí Minh</Text>
        </View>

        {/* Temperature & Humidity */}
        <View className="flex-row items-center gap-2">
          <View className="flex-1 flex-row items-center gap-2">
            <Feather name="thermometer" size={24} color="#10493F" />
            <Text className=" font-bold"> {logPump?.temperature}°C</Text>
          </View>

          <View className="flex-1 flex-row items-center gap-2">
            <Feather name="droplet" size={24} color="#10493F" />
            <Text className=" font-bold"> {logPump?.humidity}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
