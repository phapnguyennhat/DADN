import { View, Text, TouchableOpacity } from "react-native";
import useLed from "@/hook/useLed";
import { useCreateLogLight } from "@/hook/hookLog";
import { useEffect, useMemo } from "react";
interface IProps {
  modeLed: string;
}
export default function CurrentLedStatus({ modeLed }: IProps) {
  const { ledStatus, lightData, handleSetLedStatus, client } = useLed();

  const createLogLight = useCreateLogLight();

  useEffect(() => {
    if (isNaN(+lightData)) return;

    if (+lightData > 50 && ledStatus === "1" && modeLed === "auto") {
      createLogLight.mutate({
        lightIntensity: +lightData,
        typeLog: "auto",
        lightStatus: "off",
      });
      handleSetLedStatus("0");
    } else if (+lightData <= 50 && ledStatus === "0" && modeLed === "auto") {
      createLogLight.mutate({
        lightIntensity: +lightData,
        typeLog: "auto",
        lightStatus: "on",
      });
      handleSetLedStatus("1");
    }
  }, [lightData, ledStatus, modeLed]);

  const disabled = useMemo(
    () => createLogLight.isPending || modeLed === "auto",
    [modeLed, createLogLight.isPending]
  );

  return (
    <View className="w-[390px]  mb-[20px] mx-auto h-[228px] bg-[#10493F] rounded-[24px] flex-row justify-center items-center gap-[29px]   ">
      {ledStatus === "1" ? (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            handleSetLedStatus("0");
            createLogLight.mutate({
              lightIntensity: +lightData,
              typeLog: "manual",
              lightStatus: "off",
            });
          }}
          className={` rounded-full size-[128px] bg-white justify-center items-center   ${
            disabled && "opacity-60"
          }  `}
        >
          <Text className=" font-bold text-3xl text-[#10493F]">ON</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            handleSetLedStatus("1");
            createLogLight.mutate({
              lightIntensity: +lightData,
              typeLog: "manual",
              lightStatus: "on",
            });
          }}
          className={` rounded-full size-[128px] bg-[#5AFCDF] justify-center items-center  ${
            disabled && "opacity-60"
          }  `}
        >
          <Text className=" font-bold text-3xl text-[#10493F]">OFF</Text>
        </TouchableOpacity>
      )}

      <View className="w-[180px]">
        <Text className="text-wrap text-white font-bold text-2xl">
          Cường độ ánh sáng: {lightData}
        </Text>
      </View>
    </View>
  );
}
