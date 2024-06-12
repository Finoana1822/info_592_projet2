import axios from "axios";
import { UserType } from "../@types/User.type";

export const auth = async (user: UserType) => {
  try {
    const response = await axios.post(`/auth/login`, user);
    return response;
  } catch (error: any) {
    return error;
  }
};
