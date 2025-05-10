import Feather from "@expo/vector-icons/build/Feather";
import { Link, useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function RoomCard({
  logLight,
}: {
  logLight: LogLight | undefined;
}) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/(tabs)/light")}
      className="  border-2 border-primary rounded-xl overflow-hidden"
    >
      {logLight?.lightStatus === "off" ? (
        <Image
          source={require("../assets/images/room_dark.jpg")}
          className="w-full h-[170px] object-cover "
        />
      ) : (
        <Image
          source={require("../assets/images/room_light.jpg")}
          className="w-full h-[170px] object-cover "
        />
      )}
      <View className=" p-4 flex flex-col gap-2">
        <Text className=" font-bold text-xl">Phòng ngủ của tôi </Text>

        <View className="flex-row items-center gap-2">
          <Feather name="map-pin" size={24} color="black" />
          <Text className=" text-sm">123 Đường ABC, Quận 1, Hồ Chí Minh</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
