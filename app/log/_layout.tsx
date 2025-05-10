import { Stack } from "expo-router";

export default function LogLayout() {
  return (
    <Stack>
      <Stack.Screen name="LogLightDetail" options={{ headerShown: false }} />
      <Stack.Screen name="LogPumpDetail" options={{ headerShown: false }} />
    </Stack>
  );
}
