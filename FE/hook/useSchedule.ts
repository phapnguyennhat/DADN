import { myApiConfig } from "@/api/config/myApiConfig";
import { formatDateToVietnamTime } from "@/lib/util";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { Toast } from "toastify-react-native";

const createSchedule = async (data: CreateSchedule) => {
  const formatDate = formatDateToVietnamTime(data.startDate);
  const response = await myApiConfig.post("schedule", {
    type: data.type,
    startDate: formatDate,
    data: data.data,
  });
  return response.data;
};

const removeSchedule = async (id: string) => {
  const response = await myApiConfig.delete(`schedule/${id}`);
  return response.data;
};

const getSchedules = async () => {
  const response = await myApiConfig.get<ISchedule[]>("/schedule");
  return response.data;
};

export const useCreateSchedule = () => {
  return useMutation({
    mutationFn: createSchedule,
  });
};

export const useGetSchedules = () => {
  return useQuery({
    queryKey: ["schedules"],
    queryFn: getSchedules,
  });
};

export const useRemoveSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      Toast.success("Schedule removed successfully");
    },
    onError: () => {
      Toast.error("Schedule removed failed");
    },
  });
};
