import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './global.css';
import { STALETIME } from '@/common/constant';
import ToastManager from 'toastify-react-native';
import { StyleSheet } from 'react-native';
import { MqttProvider } from '@/provider/MqttProvider';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { retry: false, staleTime: STALETIME },
		mutations: { retry: false },
	},
});

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<MqttProvider>
				<ToastManager
					style={styles.toast}
					textStyle={{
						fontSize: 16,
					}}
					position="top"
					animationIn={'slideInDown'}
					animationOut={'slideOutUp'}
					showProgressBar={false}
				/>
				<Stack>
					<Stack.Screen
						name="index"
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="LogPumpDetail"
						options={{
							headerShown: false,
						}}
                    />
                    <Stack.Screen
						name="LogLightDetail"
						options={{
							headerShown: false,
						}}
					/>
				</Stack>
			</MqttProvider>
		</QueryClientProvider>
	);
}

const styles = StyleSheet.create({
	toast: {
		fontSize: 16,
		width: '100%',
		top: 0,
	},
});
