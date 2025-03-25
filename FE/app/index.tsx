import { Animated, Switch, Text, TouchableOpacity, View } from 'react-native';
import { connect, MqttClient } from '@taoqf/react-native-mqtt';
import { useEffect, useRef, useState } from 'react';
import { ADAFRUIT_AIO_KEY, ADAFRUIT_AIO_USERNAME, FEED_PUMP, MQTT_BROKER } from '@/common/constant';
import Greeting from '@/components/Greeting';
import CurrentStatus from '@/components/CurrentStatus';
export default function Index() {
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [client, setClient] = useState<MqttClient| null>(null)
 
  // useEffect(()=>{
  //   const setTimeOutId = setTimeout(() => {
  //     if(client){
  //       const newState = isPumpOn? '0': '1'
  //       console.log(`🚰 Điều khiển máy bơm: ${newState}`);
  //       client.publish(FEED_PUMP, newState, {qos: 0, retain: false})
  //     }
  //   }, 200);

  //   return ()=> clearTimeout(setTimeOutId)
  // },[isPumpOn])



  return (
      <View className="flex-1 bg-[#EBECF2] ">
          <Greeting/>
          <CurrentStatus/>
      </View>
  );
}