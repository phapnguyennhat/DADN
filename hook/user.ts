import { myApiConfig } from "@/api/config/myApiConfig";
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const useGetProfile = () => {
    const router = useRouter();
  
    const getProfile = async () => {
      const response = await myApiConfig.get("/user/profile");
      return response.data;
    };
  
    const query = useQuery({
      queryKey: ["profile"],
      queryFn: getProfile,
    });
  
   // Move navigation logic to useEffect to avoid running during render
    useEffect(() => {
      if (query.isError && (query.error as any).response?.status === 401) {
        router.replace("/login");
      }
    }, [query.isError, query.error, router]);
  
    return query;
  };