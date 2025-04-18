import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

export default function LogLightDetail() {
    const { log } = useLocalSearchParams()
    const logJson: LogLight = JSON.parse(log as string)
    
    const router = useRouter()
  return (
      <View className='bg-[#EBECF2] pt-[23px]   flex-1' >
          
          <View className=" px-[18px] flex-row items-center ">
				<TouchableOpacity onPress={() => router.back()}>
					<FontAwesome
						name="arrow-circle-left"
						size={30}
						color="#10493F"
					/>
				</TouchableOpacity>
				<Text className="  font-bold text-[25px] text-center mx-auto">
					{logJson.createAt}
				</Text>
			</View>
          
  </View>
  )
}
