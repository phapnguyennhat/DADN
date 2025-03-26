import { Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getGreeting } from '@/lib/util';

interface IProps {
	saveMode: (newMode: 'manual' | 'auto') => Promise<void>;
	mode: string
}
export default function Greeting({ saveMode, mode }: IProps) {
  
	return (
		<View className=" mt-[46px] mx-[39px] mb-[47px] flex-row justify-between items-center ">
			<View>
				<Text className=" font-bold text-3xl  ">Hi, Admin!</Text>
				<Text className=" font-normal text-xl">{getGreeting()}</Text>
			</View>
			{mode === 'auto' ? (
        <TouchableOpacity onPress={()=>saveMode('manual')}>
          
					<MaterialCommunityIcons
						name="refresh-auto"
						size={32}
						color={'#10493F'}
					/>
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={()=>saveMode('auto')} >
					<FontAwesome
						name="hand-stop-o"
						size={32}
						color={'#10493F'}
					/>
				</TouchableOpacity>
			)}
		</View>
	);
}
