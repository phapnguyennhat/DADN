import { ADAFRUIT_AIO_KEY, ADAFRUIT_AIO_USERNAME, FEED_DHT_20, FEED_PUMP, FEED_SOIL_HUMIDITY, MQTT_BROKER } from "@/common/constant";
import { connect, MqttClient } from "@taoqf/react-native-mqtt";
import { useCallback, useEffect, useState } from "react";


export default function useMqtt() {
    const [client, setClient] = useState<MqttClient| null>(null)
    const [pumpStatus, setPumpStatus] = useState('0')
    const [dhtData, setDhtData] = useState('0')
    const [humidityData, setHumidityData]  =useState('0')

    const handleSetPumpStatus =  useCallback((data: '0'| '1')=>{
      if(client){
        console.log(`🚰 Điều khiển máy bơm: ${data}`);
        client.publish(FEED_PUMP, data, {qos: 0, retain: false})
        setPumpStatus(data)
      }
    },[client])

  
    useEffect(() => {
      // CONNECT TO CLOUD
      const mqttClient = connect(MQTT_BROKER, {
          username: ADAFRUIT_AIO_USERNAME,
          password: ADAFRUIT_AIO_KEY,
      });

      // SUBCRIBE FEED TO LISTEN
      mqttClient.on('connect', ()=>{
        console.log("✅ Kết nối MQTT thành công!");
        mqttClient.subscribe(FEED_PUMP)
        mqttClient.subscribe(FEED_DHT_20)
        mqttClient.subscribe(FEED_SOIL_HUMIDITY)
      })
      setClient(mqttClient)

      

      // LISTEN MESSAGE
      mqttClient.on('message', (topic, message)=>{
        const data = message.toString();
        console.log(`📡 Nhận MQTT: ${topic} -> ${data}`);
        if(topic ===FEED_PUMP){
          setPumpStatus(data)
        }else if (topic ===FEED_DHT_20){
          setDhtData(data)
        }else if(topic===FEED_SOIL_HUMIDITY){
          setHumidityData(data)
        }
      })

      return ()=>{
        console.log("🔌 Ngắt kết nối MQTT...");
        mqttClient.end();
      }
  }, []);
  
  return {pumpStatus, handleSetPumpStatus, dhtData, humidityData}
}
