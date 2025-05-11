import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScheduleType } from "@/common/enum";
import { useCreateSchedule } from "@/hook/useSchedule";
import { Toast } from "toastify-react-native";
import { useQueryClient } from "@tanstack/react-query";

const scheduleSchema = z.object({
  type: z.enum([ScheduleType.PUMP, ScheduleType.LIGHT]),
  startDate: z.date(),
  data: z.enum(["0", "1"]),
});

type ScheduleFormData = z.infer<typeof scheduleSchema>;

export default function ScheduleForm() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      type: ScheduleType.PUMP,
      data: "1",
    },
  });

  const createSchedule = useCreateSchedule();

  const queryClient = useQueryClient();

  const onSubmit = (data: ScheduleFormData) => {
    createSchedule.mutate(data, {
      onSuccess: () => {
        Toast.success("Tạo lịch thành công");
        queryClient.invalidateQueries({ queryKey: ["schedules"] });
      },
      onError: (error: any) => {
        Toast.error(error.response.data.message || "Network Error");
      },
    });
  };

  const onDateChange = (e: DateTimePickerEvent, selectedDate?: Date) => {
    if (e.type === "dismissed") {
      setShowDatePicker(false);
      setMode("date");
    }
    if (selectedDate) {
      if (mode === "date") {
        // Khi chọn ngày xong, chuyển sang chọn giờ
        setSelectedDate(selectedDate);
        setMode("time");
      } else {
        // Khi chọn giờ xong, cập nhật giá trị và đóng picker
        const finalDate = new Date(selectedDate);
        finalDate.setFullYear(selectedDate.getFullYear());
        finalDate.setMonth(selectedDate.getMonth());
        finalDate.setDate(selectedDate.getDate());
        setSelectedDate(finalDate);
        setValue("startDate", finalDate);
        setShowDatePicker(false);
        setMode("date"); // Reset mode về date cho lần sau
      }
    } else {
      // Nếu người dùng hủy, đóng picker và reset mode
      setShowDatePicker(false);
      setMode("date");
    }
  };

  const showPicker = () => {
    setMode("date");
    setShowDatePicker(true);
  };

  return (
    <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
      <Text className="text-xl font-bold text-[#10493F] mb-6">
        Tạo lịch mới
      </Text>

      {/* Device Type Selection */}
      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Chọn thiết bị</Text>
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => setValue("type", ScheduleType.PUMP)}
            className={`flex-1 p-4 rounded-lg border ${
              watch("type") === ScheduleType.PUMP
                ? "border-[#10493F] bg-[#10493F]"
                : "border-gray-300"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                watch("type") === ScheduleType.PUMP
                  ? "text-white"
                  : "text-[#10493F]"
              }`}
            >
              Máy bơm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setValue("type", ScheduleType.LIGHT)}
            className={`flex-1 p-4 rounded-lg border ${
              watch("type") === ScheduleType.LIGHT
                ? "border-[#10493F] bg-[#10493F]"
                : "border-gray-300"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                watch("type") === ScheduleType.LIGHT
                  ? "text-white"
                  : "text-[#10493F]"
              }`}
            >
              Đèn LED
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Status Selection */}
      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Trạng thái</Text>
        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={() => setValue("data", "1")}
            className={`flex-1 p-4 rounded-lg border ${
              watch("data") === "1"
                ? "border-[#10493F] bg-[#10493F]"
                : "border-gray-300"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                watch("data") === "1" ? "text-white" : "text-[#10493F]"
              }`}
            >
              Bật
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setValue("data", "0")}
            className={`flex-1 p-4 rounded-lg border ${
              watch("data") === "0"
                ? "border-[#10493F] bg-[#10493F]"
                : "border-gray-300"
            }`}
          >
            <Text
              className={`text-center font-bold ${
                watch("data") === "0" ? "text-white" : "text-[#10493F]"
              }`}
            >
              Tắt
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Time Selection */}
      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">
          Thời gian bắt đầu
        </Text>
        <TouchableOpacity
          onPress={showPicker}
          className="border border-gray-300 rounded-lg px-4 py-3"
        >
          <Text className="text-base">
            {selectedDate.toLocaleString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && Platform.OS === "android" && (
          <DateTimePicker
            value={selectedDate}
            mode={mode}
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={createSchedule.isPending}
        className="bg-[#10493F] rounded-lg py-4"
      >
        <Text className="text-white text-center text-lg font-bold">
          {createSchedule.isPending ? "Đang tạo..." : "Tạo lịch"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
