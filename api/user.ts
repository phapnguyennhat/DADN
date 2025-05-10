import { myApiConfig } from "./config/myApiConfig";

export const getMe = async () => {
  const response = await myApiConfig.get<User>("/user/me");
  return response.data;
};
