import { myApiConfig } from "@/api/config/myApiConfig";
import { loginSchema } from "@/app/(auth)/login";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";
export const useLogin = () => {
  const login = async (data: z.infer<typeof loginSchema>) => {
    const response = await myApiConfig.post("auth/login", data);
    return response.data;
  };

  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error: any) => {
      console.log(error);
      Toast.error(error.response.data.message || "Network Error");
    },
  });
};

export const useLogout = () => {
  const logout = async () => {
    const response = await myApiConfig.post("auth/logout");
    return response.data;
  };
  const queryClient = useQueryClient();

  const router = useRouter();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["profile"] });
      router.replace("/login");
    },
    onError: (error: any) => {
      router.replace("/login");
      // console.log(error)
      // Toast.error(error.response.data.message || 'Network Error')
    },
  });
};
