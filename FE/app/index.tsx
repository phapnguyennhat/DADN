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
import CurrentPumpStatus from '@/components/CurrentPumpStatus';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrentLedStatus from '@/components/CurrentLedStatus';
import ListLogPump from '@/components/ListLogPump';
import ListLogLight from '@/components/ListLogLight';
export default function Index() {
	const [modePump, setModePump] = useState('manual');
	const [modeLed, setModeLed] = useState('manual');

	const [showStatus, setShowStatus] = useState('pump');

	const saveModePump = async (newMode: 'manual' | 'auto') => {
		try {
			await AsyncStorage.setItem('modePump', newMode); // Lưu giá trị mode
			setModePump(newMode); // Cập nhật state
		} catch (error) {
			console.log('Error saving mode:', error);
		}
	};

	const saveModeLed = async (newMode: 'manual' | 'auto') => {
		try {
			await AsyncStorage.setItem('modeLed', newMode); // Lưu giá trị mode
			setModeLed(newMode); // Cập nhật state
		} catch (error) {
			console.log('Error saving mode:', error);
		}
	};

	const saveShowStatus = async (newStatus: 'pump' | 'led') => {
		try {
			await AsyncStorage.setItem('showStatus', newStatus); // Lưu giá trị mode
			setShowStatus(newStatus); // Cập nhật state
		} catch (error) {
			console.log('Error saving mode:', error);
		}
	};

	const loadShowStatus = async () => {
		try {
			const savedShowStatus = await AsyncStorage.getItem('showStatus');
			if (savedShowStatus !== null) {
				setShowStatus(savedShowStatus); // Khôi phục mode từ bộ nhớ
			}	
		} catch (error) {
			console.log('Error loading mode:', error);
		}
	};

	
	const loadModeLed = async () => {
		try {
			const savedModeLed = await AsyncStorage.getItem('modeLed');
			if (savedModeLed !== null) {
				setModeLed(savedModeLed); // Khôi phục mode từ bộ nhớ
			}
		} catch (error) {
			console.log('Error loading mode:', error);
		}
	};

	const loadModePump = async () => {
		try {
			const savedModePump = await AsyncStorage.getItem('modePump');
			if (savedModePump !== null) {
				setModePump(savedModePump); // Khôi phục mode từ bộ nhớ
			}
		} catch (error) {
			console.log('Error loading mode:', error);
		}
	};

	useEffect(() => {
		loadModePump();
		loadModeLed();
		loadShowStatus();
	}, []);

	return (
		<View className="flex-1 bg-[#EBECF2] ">
			<Greeting saveModePump={saveModePump} modePump={modePump} saveModeLed={saveModeLed} modeLed={modeLed} showStatus={showStatus} saveShowStatus={saveShowStatus} />
			{showStatus === 'pump' && <CurrentPumpStatus modePump={modePump} />}
			{showStatus === 'led' && <CurrentLedStatus modeLed={modeLed} />}
			{showStatus==='pump' ? <Text className='text-[#10493F] text-xl font-bold p-2  my-4' >Trạng thái hoạt động máy bơm</Text>: <Text className=' my-4 p-2 font-bold text-[#10493F] text-xl' >Trạng thái hoạt động đèn led</Text>}
			{showStatus === 'pump' && <ListLogPump />}
			{showStatus === 'led' && <ListLogLight />}
		</View>
	);
}
