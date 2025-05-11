import { getMe } from "@/api/user";
import { getGreeting } from "@/lib/util";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useQuery } from "@tanstack/react-query";
import { View, Text, TouchableOpacity } from "react-native";

interface IProps {
  modePump: string;
  saveModePump: (newMode: "manual" | "auto") => Promise<void>;
}
export default function GreetingPump({ modePump, saveModePump }: IProps) {
  const admin = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });
  return (
    <View className=" mt-[46px] mx-[20px] mb-[47px] flex-row justify-between items-center ">
      <View>
        <Text className=" font-bold text-3xl  ">Hi, {admin.data?.name}</Text>
        <Text className=" font-normal text-xl">{getGreeting()}</Text>
      </View>
      <View className="flex-row items-center gap-x-4 justify-center">
        {modePump === "auto" && (
          <TouchableOpacity onPress={() => saveModePump("manual")}>
            <MaterialCommunityIcons
              name="refresh-auto"
              size={32}
              color={"#10493F"}
            />
          </TouchableOpacity>
        )}

        {modePump === "manual" && (
          <TouchableOpacity onPress={() => saveModePump("auto")}>
            <FontAwesome name="hand-stop-o" size={32} color={"#10493F"} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
