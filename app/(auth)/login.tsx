import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLogin } from '@/hook/auth';

export  const loginSchema = z.object({
  account: z.string({message: 'Email hoặc tên đăng nhập không được để trống'}).min(1, {message: 'Email hoặc tên đăng nhập không được để trống'}),
  password: z.string({message: 'Mật khẩu không được để trống'}).min(1, {message: 'Mật khẩu không được để trống'}),
})

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const login = useLogin();

  const handleLogin = (data: z.infer<typeof loginSchema>) => {
    login.mutate(data);
   
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#EBECF2]"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 px-6 justify-center">
          {/* Logo and Title */}
          <View className="items-center mb-10">
            <View className="bg-[#10493F] rounded-full p-4 mb-4">
              <MaterialCommunityIcons name="home-automation" size={60} color="white" />
            </View>
            <Text className="text-3xl font-bold text-[#10493F]">Smart Home</Text>
            <Text className="text-gray-600 text-lg mt-2">Đăng nhập để tiếp tục</Text>
          </View>

          {/* Login Form */}
          <View className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <Text className="text-xl font-bold text-[#10493F] mb-6 text-center">Đăng nhập</Text>
            
            {/* Email/Username Field */}
            <View className="mb-4">
              <Text className="text-gray-700 mb-2 font-medium">Email hoặc tên đăng nhập</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                <MaterialCommunityIcons name="account" size={20} color="#10493F" />
                <TextInput
                  className="flex-1 ml-2 text-base"
                  placeholder="Nhập email hoặc tên đăng nhập"
                  onChangeText={(text)=>setValue('account', text)}
                  autoCapitalize="none"
                  {...register('account')}
                />
              </View>
              {errors.account && (
                <Text className="text-red-500 text-sm">{errors.account.message}</Text>
              )}
            </View>
            
            {/* Password Field */}
            <View className="mb-6">
              <Text className="text-gray-700 mb-2 font-medium">Mật khẩu</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3">
                <MaterialCommunityIcons name="lock" size={20} color="#10493F" />
                <TextInput
                  className="flex-1 ml-2 text-base"
                  placeholder="Nhập mật khẩu"
                  onChangeText={(text)=>setValue('password', text)}
                  secureTextEntry={!showPassword}
                  {...register('password')}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <MaterialCommunityIcons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={20} 
                    color="#10493F" 
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 text-sm">{errors.password.message}</Text>
              )}
            </View>
            
            {/* Login Button */}
            <TouchableOpacity   
              disabled={login.isPending}
              onPress={handleSubmit(handleLogin)}
              className="bg-[#10493F] rounded-lg py-4"
            >
              <Text className="text-white text-center text-lg font-bold">{login.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}</Text>
            </TouchableOpacity>
          </View>
          
          {/* Back to Landing */}
          <TouchableOpacity 
            onPress={() => router.push('/landing')}
            className="items-center"
          >
            <Text className="text-[#10493F] text-base">Quay lại </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
