import axios from "axios";
import { apiEndpoint } from "../config";
import type { FieldValues } from "react-hook-form";

const routeUrl = `${apiEndpoint}/jobs`;

export type Job = {
  id: string;
  title: string;
  company: string;
  status: string;
  location?: string;
  description?: string;
  email?: string;
  phone?: string;
  candidacyDate?: Date;
  interviewDate?: Date;
  followUpDate?: Date;
};

export const userJobs = async () => {
  const { data } = await axios.get(routeUrl, { withCredentials: true });
  return data;
};

export const createJob = async (job: FieldValues) => {
  await axios.post(routeUrl, job, { withCredentials: true });
};
