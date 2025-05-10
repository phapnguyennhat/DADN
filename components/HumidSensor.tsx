import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import usePump from "@/hook/usePump";
import { useRouter } from "expo-router";
export default function HumidSensor() {
  const { humidityData } = usePump();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/(tabs)/pump")}
      className="bg-white shadow-md rounded-2xl p-6"
    >
      <View className="flex-row justify-between items-center gap-x-2 mb-4">
        <View className="bg-green-50 px-4 py-2 rounded-full">
          <MaterialCommunityIcons
            name="water-percent"
            size={24}
            color="#10493F"
          />
        </View>
        <View className="bg-green-100 px-4 py-2 rounded-full">
          <Text className="t  ext-primary font-semibold">GOOD</Text>
        </View>
      </View>

      <View className="space-y-2">
        <Text className="text-gray-600 text-sm uppercase tracking-wider font-medium">
          Humidity
        </Text>
        <Text className="text-4xl font-bold text-gray-800">
          {humidityData}%
        </Text>
        <Text className="text-gray-500 text-sm">Độ ẩm ngoài sân</Text>
      </View>
    </TouchableOpacity>
  );
}
