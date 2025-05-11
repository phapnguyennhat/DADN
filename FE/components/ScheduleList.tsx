import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useGetSchedules, useRemoveSchedule } from "@/hook/useSchedule";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScheduleType } from "@/common/enum";

export default function ScheduleList() {
  const { data: schedules, isLoading, refetch } = useGetSchedules();

  return (
    <View className="flex-1">
      <FlatList
        className=""
        data={schedules}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text className="text-xl font-bold text-[#10493F] mb-4">
            Lịch đã tạo
          </Text>
        }
        refreshing={isLoading}
        onRefresh={() => refetch()}
        ListEmptyComponent={
          <Text className="text-gray-500 text-center">Không có lịch nào</Text>
        }
        renderItem={({ item }) => <ScheduleItem item={item} />}
      />
    </View>
  );
}

function ScheduleItem({ item }: { item: ISchedule }) {
  const { mutate: removeSchedule } = useRemoveSchedule();
  const getDeviceName = (type: ScheduleType) => {
    return type === ScheduleType.PUMP ? "Máy bơm" : "Đèn LED";
  };

  const getStatusText = (data: "0" | "1") => {
    return data === "1" ? "Bật" : "Tắt";
  };
  const startTime = new Date(Date.now() + item.delay);

  return (
    <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800 mb-1">
            {getDeviceName(item.name)}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-sm text-gray-500">
              {new Date(Date.now() + item.delay).toLocaleString("vi-VN")}
            </Text>
            <View className="bg-gray-100 px-2 py-1 rounded">
              <Text className="text-sm text-gray-600">
                {getStatusText(item.data)}
              </Text>
            </View>
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity onPress={() => removeSchedule(item.id)}>
          <MaterialCommunityIcons name="delete" size={24} color="#10493F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
