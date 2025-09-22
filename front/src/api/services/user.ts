import axios from "axios";
import { apiEndpoint } from "../config";

export const isLoggedIn = async () => {
  const { data } = await axios.get(`${apiEndpoint}/users`, {
    withCredentials: true,
  });
  return data;
};

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
