import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function Landing() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-[#EBECF2]">
      {/* Header Section */}
      <View className="px-6 pt-12 pb-8">
        <Text className="text-4xl font-bold text-[#10493F] mb-2">
          Smart Home
        </Text>
        <Text className="text-xl text-gray-600">
          Điều khiển thông minh cho ngôi nhà của bạn
        </Text>
      </View>

      {/* Features Section */}
      <View className="px-6 mb-8">
        <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons
              name="water-pump"
              size={32}
              color="#10493F"
            />
            <Text className="text-2xl font-bold text-[#10493F] ml-3">
              Hệ Thống Điều Hòa Thông Minh
            </Text>
          </View>
          <Text className="text-gray-600 text-lg mb-4">
            Điều khiển máy bơm tự động để duy trì nhiệt độ lý tưởng trong nhà.
            Hệ thống sẽ tự động điều chỉnh để tạo không gian sống thoải mái
            quanh năm.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="bg-[#A2E7DB] rounded-lg py-3 px-4"
          >
            <Text className="text-[#0B8570] text-center text-lg font-semibold">
              Điều khiển ngay
            </Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-2xl p-6 shadow-sm">
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons
              name="led-strip"
              size={32}
              color="#10493F"
            />
            <Text className="text-2xl font-bold text-[#10493F] ml-3">
              Đèn LED Thông Minh
            </Text>
          </View>
          <Text className="text-gray-600 text-lg mb-4">
            Điều khiển đèn LED tự động dựa trên cường độ ánh sáng. Tạo không
            gian sống thoải mái và tiết kiệm năng lượng.
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="bg-[#A2E7DB] rounded-lg py-3 px-4"
          >
            <Text className="text-[#0B8570] text-center text-lg font-semibold">
              Điều khiển ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Benefits Section */}
      <View className="px-6 mb-8">
        <Text className="text-2xl font-bold text-[#10493F] mb-4">Lợi ích</Text>
        <View className="space-y-4">
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="clock-check"
              size={24}
              color="#10493F"
            />
            <Text className="text-lg text-gray-600 ml-3">
              Tự động hóa hoàn toàn
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="thermometer"
              size={24}
              color="#10493F"
            />
            <Text className="text-lg text-gray-600 ml-3">
              Duy trì nhiệt độ tối ưu
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="lightbulb-on"
              size={24}
              color="#10493F"
            />
            <Text className="text-lg text-gray-600 ml-3">
              Tiết kiệm năng lượng
            </Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="shield-check"
              size={24}
              color="#10493F"
            />
            <Text className="text-lg text-gray-600 ml-3">
              An toàn và đáng tin cậy
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="px-6 pb-12">
        <TouchableOpacity
          onPress={() => router.push("/login")}
          className="bg-[#10493F] rounded-lg py-4 px-6"
        >
          <Text className="text-white text-center text-xl font-bold">
            Bắt đầu sử dụng
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
