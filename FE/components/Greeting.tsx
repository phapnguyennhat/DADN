import { Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { getGreeting } from "@/lib/util";

import { getMe } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Greeting() {
  const admin = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });
  const router = useRouter();
  useEffect(() => {
    if (admin.isError && admin.error instanceof AxiosError) {
      router.replace("/landing");
    }
  }, [admin.isError, admin.error]);

  const greetingString = getGreeting();

  return (
    <View className=" mt-[46px] mx-[20px] mb-[47px] flex-row justify-between items-center ">
      <View>
        <Text className=" font-bold text-3xl  ">Hi, {admin.data?.name}</Text>
        <Text className=" font-normal text-xl">{greetingString}</Text>
      </View>
      <View>
        {greetingString === "Good Morning" && (
          <Ionicons name="sunny" size={30} color="#10493F" />
        )}
        {greetingString === "Good Afternoon" && (
          <Ionicons name="partly-sunny-sharp" size={30} color="#10493F" />
        )}
        {greetingString === "Good Evening" && (
          <Ionicons name="moon" size={30} color="#10493F" />
        )}
      </View>
    </View>
  );
}
