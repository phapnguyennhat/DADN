import ScheduleHeader from "@/components/ScheduleHeader";
import { View, ScrollView, Text } from "react-native";
import ScheduleForm from "@/components/ScheduleForm";
import ScheduleList from "@/components/ScheduleList";
export default function Schedule() {
  return (
    <View className=" flex-1 px-6">
      <ScheduleHeader />

      <ScheduleForm />

      <ScheduleList />
    </View>
  );
}
