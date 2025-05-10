import ScheduleHeader from "@/components/ScheduleHeader";
import { View, ScrollView, Text } from "react-native";
import ScheduleForm from "@/components/ScheduleForm";
import { useGetSchedules } from "@/hook/useSchedule";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScheduleType } from "@/common/enum";

export default function Schedule() {
  const { data: schedules, isLoading } = useGetSchedules();

  return (
    <ScrollView className="flex-1 bg-[#EBECF2]">
      <ScheduleHeader />
      <View className="px-6">
        <ScheduleForm />

        {/* Schedule List */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-[#10493F] mb-4">
            Lịch đã tạo
          </Text>
          {isLoading ? (
            <Text className="text-gray-500">Đang tải...</Text>
          ) : schedules?.length === 0 ? (
            <Text className="text-gray-500">Chưa có lịch nào được tạo</Text>
          ) : (
            schedules?.map((schedule: ISchedule) => (
              <View
                key={schedule.id}
                className="bg-white rounded-lg p-4 mb-4 shadow-sm"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons
                      name={
                        schedule.type === ScheduleType.PUMP
                          ? "water-pump"
                          : "led-strip"
                      }
                      size={24}
                      color="#10493F"
                    />
                    <Text className="ml-2 font-bold text-lg">
                      {schedule.type === ScheduleType.PUMP
                        ? "Máy bơm"
                        : "Đèn LED"}
                    </Text>
                  </View>
                  <Text
                    className={`font-bold ${
                      schedule.data === "1" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {schedule.data === "1" ? "Bật" : "Tắt"}
                  </Text>
                </View>
                <Text className="text-gray-600">
                  {new Date(schedule.startDate).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}
