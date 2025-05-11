import CurrentPumpStatus from "@/components/CurrentPumpStatus";
import GreetingPump from "@/components/GreetingPump";
import ListLogPump from "@/components/ListLogPump";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Pump() {
  const [modePump, setModePump] = useState("manual");
  const saveModePump = async (newMode: "manual" | "auto") => {
    try {
      await AsyncStorage.setItem("modePump", newMode); // Lưu giá trị mode
      setModePump(newMode); // Cập nhật state
    } catch (error) {
      console.log("Error saving mode:", error);
    }
  };

  const loadModePump = async () => {
    try {
      const savedModePump = await AsyncStorage.getItem("modePump");
      if (savedModePump !== null) {
        setModePump(savedModePump); // Khôi phục mode từ bộ nhớ
      }
    } catch (error) {
      console.log("Error loading mode:", error);
    }
  };

  useEffect(() => {
    loadModePump();
  }, []);
  return (
    <View className=" flex-1">
      <GreetingPump modePump={modePump} saveModePump={saveModePump} />
      <CurrentPumpStatus modePump={modePump} />
      <ListLogPump />
    </View>
  );
}
