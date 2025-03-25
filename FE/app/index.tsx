import { Animated, Switch, Text, TouchableOpacity, View } from 'react-native';
import { connect, MqttClient } from '@taoqf/react-native-mqtt';
import { useEffect, useRef, useState } from 'react';
import { ADAFRUIT_AIO_KEY, ADAFRUIT_AIO_USERNAME, FEED_PUMP, MQTT_BROKER } from '@/common/constant';
import Greeting from '@/components/Greeting';
import CurrentStatus from '@/components/CurrentStatus';
export default function Index() {
  
 
  return (
      <View className="flex-1 bg-[#EBECF2] ">
          <Greeting/>
          <CurrentStatus/>
      </View>
  );
}