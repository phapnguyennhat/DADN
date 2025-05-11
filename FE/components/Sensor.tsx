import { View, Text, ScrollView } from "react-native";
import TempSensor from "./TempSensor";
import HumidSensor from "./HumidSensor";
import LedSensor from "./LedSensor";

export default function Sensor() {
  return (
    <View className="mx-[20px] mb-[20px]">
      <Text className="text-2xl mb-6 font-bold">Sensors Data </Text>
      <ScrollView
        className=" pb-[20px]"
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ gap: 20 }}
      >
        <TempSensor />
        <HumidSensor />

        <LedSensor />
      </ScrollView>
    </View>
  );
}
