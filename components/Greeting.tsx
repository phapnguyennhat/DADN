import React from 'react'
import { Text, View } from 'react-native'

export default function Greeting() {

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };
  
  return (
   <View className=' mt-[46px] ml-[39px] mb-[47px] '  >
        <Text className=' font-bold text-3xl  ' >Hi, Admin!</Text>
        <Text className=' font-normal text-xl' >{getGreeting()}</Text>
   </View>
  )
}
