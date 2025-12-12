import { create } from "zustand";
import {
  createJob as apiCreateJob,
  deleteJob as apiDeleteJob,
  userJobs,
  type Job,
} from "../api/services/job";
import { toast } from "sonner";
import type { FieldValues } from "react-hook-form";

interface JobState {
  jobs: Job[];
  getJobs: () => Promise<void>;

  search: string;
  status: string;
  updateSearch: (search: string) => void;
  updateStatus: (status: string) => void;

  jobsFiltered: Job[];
  getJobsFiltered: (search: string, status: string) => Promise<void>;

  createJob: (job: FieldValues) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  getJobs: () =>
    userJobs("", "*").then((res) => set({ jobs: res, jobsFiltered: res })),

  search: "",
  status: "*",
  updateSearch: (search: string) => set({ search }),
  updateStatus: (status: string) => set({ status }),

  jobsFiltered: [],
  getJobsFiltered: (search: string, status: string) =>
    userJobs(search, status).then((res) => set({ jobsFiltered: res })),

  createJob: async (job) => {
    apiCreateJob(job).then(() => {
      useJobStore.getState().getJobs();
      useJobStore
        .getState()
        .getJobsFiltered(
          useJobStore.getState().search,
          useJobStore.getState().status
        );
      toast.success("Poste créé avec succès");
    });
  },
  deleteJob: (id: string) =>
    apiDeleteJob(id).then(() => {
      set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== id),
        jobsFiltered: state.jobsFiltered.filter((job) => job.id !== id),
      }));
      toast.success("Job supprimé !");
    }),
}));
