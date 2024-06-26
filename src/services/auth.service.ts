import { UserType } from "../@types/User.type";
import { instance } from "../api/axios.config";

export const auth = async (user: UserType) => {
  try {
    const response = await instance.post(`/login`, user);
    return response;
  } catch (error: any) {
    return error.response;
  }
};