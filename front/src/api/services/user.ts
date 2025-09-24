import axios from "axios";
import { apiEndpoint } from "../config";

const routeUrl = `${apiEndpoint}/users`;

export const isLoggedIn = async () => {
  const { data } = await axios.get(routeUrl, {
    withCredentials: true,
  });
  return data;
};

export const userLogin = async (email: string, password: string) => {
  const { data } = await axios.post(
    `${routeUrl}/login`,
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
    routeUrl,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return data;
};
