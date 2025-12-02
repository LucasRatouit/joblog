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

export const userJobs = async ({ search }: { search: string }) => {
  console.log("Fetching jobs with search:", search);
  return await axios
    .get(routeUrl, { withCredentials: true, params: { search: search } })
    .then((res) => res.data)
    .catch(() => (window.location.href = "/"));
};

export const createJob = async (job: FieldValues) => {
  await axios
    .post(routeUrl, job, { withCredentials: true })
    .catch(() => (window.location.href = "/"));
};

export const deleteJob = async (id: string) => {
  await axios
    .delete(`${routeUrl}/${id}`, { withCredentials: true })
    .catch(() => (window.location.href = "/"));
};
