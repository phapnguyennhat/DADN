import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../global.css";
import { STALETIME } from "@/common/constant";
import ToastManager from "toastify-react-native";
import { StyleSheet } from "react-native";
import { MqttProvider } from "@/provider/MqttProvider";
import StoreProvider from "@/provider/StoreProvider";
import ProtectAuthProvider from "@/provider/ProtectAuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, staleTime: STALETIME },
    mutations: { retry: false },
  },
});

export default function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <MqttProvider>
        <ToastManager
          style={styles.toast}
          textStyle={{
            fontSize: 16,
          }}
          position="top"
          animationIn={"slideInDown"}
          animationOut={"slideOutUp"}
          showProgressBar={false}
        />
        <StoreProvider>
          <ProtectAuthProvider>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="log" options={{ headerShown: false }} />
            </Stack>
          </ProtectAuthProvider>
        </StoreProvider>
      </MqttProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  toast: {
    fontSize: 16,
    width: "100%",
    top: 0,
  },
});
