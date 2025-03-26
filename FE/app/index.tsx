import { Animated, Switch, Text, TouchableOpacity, View } from 'react-native';
import { connect, MqttClient } from '@taoqf/react-native-mqtt';
import { useEffect, useRef, useState } from 'react';
import {
	ADAFRUIT_AIO_KEY,
	ADAFRUIT_AIO_USERNAME,
	FEED_PUMP,
	MQTT_BROKER,
} from '@/common/constant';
import Greeting from '@/components/Greeting';
import CurrentStatus from '@/components/CurrentStatus';
import ListLog from '@/components/ListLog';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Index() {
	const [mode, setMode] = useState('manual');

	const saveMode = async (newMode: 'manual' | 'auto') => {
		try {
			await AsyncStorage.setItem('mode', newMode); // Lưu giá trị mode
			setMode(newMode); // Cập nhật state
		} catch (error) {
			console.log('Error saving mode:', error);
		}
	};

	const loadMode = async () => {
		try {
			const savedMode = await AsyncStorage.getItem('mode');
			if (savedMode !== null) {
				setMode(savedMode); // Khôi phục mode từ bộ nhớ
			}
		} catch (error) {
			console.log('Error loading mode:', error);
		}
	};

	useEffect(() => {
		loadMode();
	}, []);

	return (
		<View className="flex-1 bg-[#EBECF2] ">
			<Greeting saveMode={saveMode} mode={mode} />
			<CurrentStatus mode={mode} />
			<ListLog />
		</View>
	);
}
