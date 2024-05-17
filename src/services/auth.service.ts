import { UserType } from "../@types/User.type";
import { instance } from "../Utils/axios.config";

export const auth = async (user: UserType) => {
  try {
    const response = await instance.post(`/auth/login`, user);
    return response;
  } catch (error: any) {
    return error;
  }
};
