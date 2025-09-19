import axios from "axios";
import { apiEndpoint } from "../config";

export const userLogin = async (email: string, password: string) => {
  const { data } = await axios.post(
    `${apiEndpoint}/users/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return data;
};

export const userRegister = async (email: string, password: string) => {
  const { data } = await axios.post(
    `${apiEndpoint}/users`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return data;
};
