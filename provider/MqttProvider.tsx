import { MQTT_BROKER } from "@/common/constant";
import { ADAFRUIT_AIO_USERNAME } from "@/common/constant";
import { ADAFRUIT_AIO_KEY } from "@/common/constant";
import { connect, MqttClient } from "@taoqf/react-native-mqtt";
import { createContext, useContext, useEffect, useState } from "react";

const MqttContext = createContext<MqttClient | null>(null);

export const MqttProvider = ({ children }: { children: React.ReactNode }) => {
  const [client, setClient] = useState<MqttClient | null>(null);

  useEffect(() => {
    const mqttClient = connect(MQTT_BROKER, {
      username: ADAFRUIT_AIO_USERNAME,
      password: ADAFRUIT_AIO_KEY,
    });

    setClient(mqttClient);

    return () => {
      console.log("🔌 Ngắt kết nối MQTT...");
      mqttClient.end();
    };
  }, []);

  return <MqttContext.Provider value={client}>{children}</MqttContext.Provider>;
};

export const useClientMqtt = () => {
  return useContext(MqttContext);
};
