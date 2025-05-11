import CurrentLedStatus from "@/components/CurrentLedStatus";
import GreetingLight from "@/components/GreetingLight";
import ListLogLight from "@/components/ListLogLight";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Light() {
  const [modeLed, setModeLed] = useState("manual");
  const saveModeLed = async (newMode: "manual" | "auto") => {
    try {
      await AsyncStorage.setItem("modeLed", newMode); // Lưu giá trị mode
      setModeLed(newMode); // Cập nhật state
    } catch (error) {
      console.log("Error saving mode:", error);
    }
  };

  const loadModeLed = async () => {
    try {
      const savedModeLed = await AsyncStorage.getItem("modeLed");
      if (savedModeLed !== null) {
        setModeLed(savedModeLed); // Khôi phục mode từ bộ nhớ
      }
    } catch (error) {
      console.log("Error loading mode:", error);
    }
  };

  useEffect(() => {
    loadModeLed();
  }, []);

  return (
    <View className=" flex-1">
      <GreetingLight modeLed={modeLed} saveModeLed={saveModeLed} />
      <CurrentLedStatus modeLed={modeLed} />
      <ListLogLight />
    </View>
  );
}
