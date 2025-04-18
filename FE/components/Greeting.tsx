import { Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getGreeting } from '@/lib/util';

interface IProps {
	saveModePump: (newMode: 'manual' | 'auto') => Promise<void>;
	saveModeLed: (newMode: 'manual' | 'auto') => Promise<void>;
	modePump: string
	modeLed: string
	showStatus: string
	saveShowStatus: (newStatus: 'pump' | 'led') => Promise<void>;
}
export default function Greeting({ saveModePump, modePump, saveModeLed, modeLed, showStatus, saveShowStatus }: IProps) {

	return (
		<View className=" mt-[46px] ml-[39px] mr-[20px] mb-[47px] flex-row justify-between items-center ">
			<View>
				<Text className=" font-bold text-3xl  ">Hi, Admin!</Text>
				<Text className=" font-normal text-xl">{getGreeting()}</Text>
			</View>
			<View className='flex-row items-center gap-x-4 justify-center'>

				{showStatus === 'pump' && (
					<TouchableOpacity onPress={() => saveShowStatus('led')} className='bg-[#A2E7DB] rounded-[7px]  ' ><Text className='text-[#0B8570] text-xl font-semibold  px-2 py-1  '>Máy Bơm </Text></TouchableOpacity>
				)}

				{showStatus === 'led' && (
					<TouchableOpacity onPress={() => saveShowStatus('pump')} className='bg-[#A2E7DB] rounded-[7px]  ' ><Text className='text-[#0B8570] text-xl font-semibold  px-2 py-1  '>Đèn Led </Text></TouchableOpacity>
				)}

				{modePump === 'auto' && showStatus === 'pump' && (
					<TouchableOpacity onPress={() => saveModePump('manual')}>

					<MaterialCommunityIcons
						name="refresh-auto"
						size={32}
						color={'#10493F'}
					/>
				</TouchableOpacity>
				)}

				{modePump === 'manual' && showStatus === 'pump' && (
					<TouchableOpacity onPress={() => saveModePump('auto')} >
						<FontAwesome
							name="hand-stop-o"
							size={32}
							color={'#10493F'}
						/>
					</TouchableOpacity>
				)}

				{modeLed === 'auto' && showStatus === 'led' && (
					<TouchableOpacity onPress={() => saveModeLed('manual')}>
						<MaterialCommunityIcons
							name="refresh-auto"
							size={32}
							color={'#10493F'}
						/>
					</TouchableOpacity>
				)}

				{modeLed === 'manual' && showStatus === 'led' && (
					<TouchableOpacity onPress={() => saveModeLed('auto')}>
						<FontAwesome
							name="hand-stop-o"
							size={32}
							color={'#10493F'}
						/>
					</TouchableOpacity>
				)}
				
			</View>
		</View>
	);
}
