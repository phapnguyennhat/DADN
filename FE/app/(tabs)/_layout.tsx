import { Tabs } from "expo-router";
import HomeIcon from "./../../assets/images/home_icon.svg";
import PumpIcon from "./../../assets/images/pump_icon.svg";
import LightIcon from "./../../assets/images/light_icon.svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, Text } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View className={`${focused ? "opacity-100" : "opacity-40"}`}>
              <Text className="text-sm font-bold text-primary">Home</Text>
            </View>
          ),

          tabBarIcon: ({ focused, color }) => (
            <View className={`${focused ? "opacity-100" : "opacity-40"}`}>
              <HomeIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="pump"
        options={{
          headerShown: false,

          tabBarLabel: ({ focused }) => (
            <View className={`${focused ? "opacity-100" : "opacity-40"}`}>
              <Text className="text-sm font-bold text-primary">Pump</Text>
            </View>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View className={`${focused ? "opacity-100" : "opacity-40"}`}>
              <PumpIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="light"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View className={`${focused ? "opacity-100" : "opacity-40"}`}>
              <Text className="text-sm font-bold text-primary">Light</Text>
            </View>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View className={`${focused ? "opacity-100" : "opacity-40"}`}>
              <LightIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <View className={`${focused ? "opacity-100" : "opacity-40"}`}>
              <Text className="text-sm font-bold text-primary">Schedule</Text>
            </View>
          ),
          tabBarIcon: ({ focused, color }) => (
            <View className={`${focused ? "opacity-100" : "opacity-40"}`}>
              <MaterialIcons name="schedule" size={24} color={"#10493F"} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
