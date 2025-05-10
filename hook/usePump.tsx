import { getDhtData, getHumidityData, getPumpStatus } from "@/api/adafruit";
import { FEED_DHT_20, FEED_HUMIDITY, FEED_PUMP } from "@/common/constant";

import { useClientMqtt } from "@/provider/MqttProvider";

import { useCallback, useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

export default function usePump() {
  const client = useClientMqtt();
  const [pumpStatus, setPumpStatus] = useState("N/A");
  const [dhtData, setDhtData] = useState("N/A");
  const [humidityData, setHumidityData] = useState("N/A");

  const initData = async () => {
    try {
      if (pumpStatus === "N/A") {
        const pumpStatus = await getPumpStatus();

        setPumpStatus(pumpStatus);
      }
      if (dhtData === "N/A") {
        const lastDhtData = await getDhtData();

        setDhtData(lastDhtData);
      }
      if (humidityData === "N/A") {
        const lastHumidityData = await getHumidityData();
        setHumidityData(lastHumidityData);
      }
    } catch (error: any) {
      Toast.error(error.response.data.message || "Network Error");
    }
  };

  useEffect(() => {
    initData();
  }, []);

  const handleSetPumpStatus = useCallback(
    (data: "0" | "1") => {
      if (client) {
        console.log(`🚰 Điều khiển máy bơm: ${data}`);
        client.publish(FEED_PUMP, data, { qos: 0, retain: false });
        setPumpStatus(data);
      }
    },
    [client]
  );

  useEffect(() => {
    // CONNECT TO CLOUD

    if (!client) return;

    // SUBCRIBE FEED TO LISTEN
    client.on("connect", () => {
      console.log("✅ Kết nối MQTT thành công!");
      client.subscribe(FEED_PUMP);
      client.subscribe(FEED_DHT_20);
      client.subscribe(FEED_HUMIDITY);
    });

    // LISTEN MESSAGE
    client.on("message", (topic, message) => {
      const data = message.toString();
      // console.log(`📡 Nhận MQTT: ${topic} -> ${data}`);
      if (topic === FEED_PUMP) {
        setPumpStatus(data);
      } else if (topic === FEED_DHT_20) {
        setDhtData(data);
      } else if (topic === FEED_HUMIDITY) {
        setHumidityData(data);
      }
    });
  }, [client]);

  return { pumpStatus, handleSetPumpStatus, dhtData, humidityData, client };
}
