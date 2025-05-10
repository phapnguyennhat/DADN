import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useLed from "@/hook/useLed";
import { useRouter } from "expo-router";

export default function LedSensor() {
  const { lightData } = useLed();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/(tabs)/light")}
      className="bg-white shadow-md rounded-2xl p-6"
    >
      <View className="flex-row justify-between items-center gap-x-2 mb-4">
        <View className="bg-green-50 px-4 py-2 rounded-full">
          <MaterialCommunityIcons name="lightbulb" size={24} color="#10493F" />
        </View>
        <View className="bg-green-100 px-4 py-2 rounded-full">
          <Text className="t  ext-primary font-semibold">GOOD</Text>
        </View>
      </View>

      <View className="space-y-2">
        <Text className="text-gray-600 text-sm uppercase tracking-wider font-medium">
          Light
        </Text>
        <Text className="text-4xl font-bold text-gray-800">{lightData}</Text>
        <Text className="text-gray-500 text-sm">Độ sáng trong phòng</Text>
      </View>
    </TouchableOpacity>
  );
}
