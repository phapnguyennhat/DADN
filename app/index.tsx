import { Animated, Switch, Text, TouchableOpacity, View } from 'react-native';
import { connect, MqttClient } from '@taoqf/react-native-mqtt';
import { useEffect, useRef, useState } from 'react';
import { ADAFRUIT_AIO_KEY, ADAFRUIT_AIO_USERNAME, FEED_PUMP, MQTT_BROKER } from '@/common/constant';
export default function Index() {
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [client, setClient] = useState<MqttClient| null>(null)
  const translateX = useRef(new Animated.Value(10)).current; // Giá trị khởi tạo của vị trí nút


  const toggleSwitch = () => {
      if(client){
        const newState = isPumpOn? '0': '1'
        console.log(`🚰 Điều khiển máy bơm: ${newState}`);
        client.publish(FEED_PUMP, newState, {qos: 0, retain: false})
        setIsPumpOn(prev=>!prev)
      }
      
      Animated.timing(translateX, {
          toValue: isPumpOn ? 10 : 140, // Di chuyển từ trái sang phải (hoặc ngược lại)
          duration: 300, // 300ms animation
          useNativeDriver: false, // Vì chúng ta đang thay đổi layout (không phải opacity)
      }).start();
  };


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
      })
      setClient(mqttClient)

      // LISTEN MESSAGE
      mqttClient.on('message', (topic, message)=>{
        const data = message.toString();
        console.log(`📡 Nhận MQTT: ${topic} -> ${data}`);
        if(topic ===FEED_PUMP){
          setIsPumpOn(data==='1')
        }
      })

      return ()=>{
        console.log("🔌 Ngắt kết nối MQTT...");
        mqttClient.end();
      }
  }, []);

  return (
      <View className="flex-1 justify-center items-center">
          <Text className=' text-lg uppercase mb-2' >Trạng thái máy bơm </Text>
          <TouchableOpacity
              onPress={toggleSwitch}
              className={`flex-row items-center px-6 justify-between relative h-[60px] w-[200px] rounded-full ${isPumpOn ? 'bg-green-500' : 'bg-red-500'}`}
          >
              <Text>ON</Text>
              <Text>OFF</Text>

              {/* Nút trượt có animation */}
              <Animated.View
                  style={{ transform: [{ translateX }] }} // Animation khi di chuyển
                  className="size-[50px] bg-black absolute rounded-full"
              />
          </TouchableOpacity>
      </View>
  );
}