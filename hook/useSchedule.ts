import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "axios";

const createSchedule = async (data: CreateSchedule) => {
  console.log(data);
};

const getSchedules = async () => {
  const response = await axios.get("/schedule");
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
