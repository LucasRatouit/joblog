import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface DemoJob {
  id: string;
  title: string;
  company: string;
  location: string;
  status: string;
  comment?: string;
  createdAt: string;
  candidacyDate?: string;
}

interface DemoState {
  jobs: DemoJob[];
  addJob: (job: Omit<DemoJob, "id" | "createdAt">) => void;
  deleteJob: (id: string) => void;
  updateJobStatus: (id: string, status: string) => void;
}

const INITIAL_JOBS: DemoJob[] = [
  {
    id: "1",
    title: "Développeur Fullstack Senior",
    company: "TechNova Solutions",
    location: "Paris (Hybride)",
    status: "INTERVIEW",
    comment: "Entretien technique prévu pour mardi prochain à 10h.",
    createdAt: new Date().toISOString(),
    candidacyDate: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Lead Frontend Engineer",
    company: "CloudScale Systems",
    location: "Lyon (Full Remote)",
    status: "ACCEPTED",
    comment: "Offre reçue et acceptée ! Début de contrat le 1er avril.",
    createdAt: new Date().toISOString(),
    candidacyDate: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Ingénieur Logiciel (Node.js)",
    company: "DataPulse Inc.",
    location: "Nantes",
    status: "PENDING",
    comment: "Candidature envoyée via LinkedIn.",
    createdAt: new Date().toISOString(),
    candidacyDate: new Date().toISOString(),
  }
];

export const useDemoStore = create<DemoState>()(
  persist(
    (set) => ({
      jobs: INITIAL_JOBS,
      addJob: (jobData) => set((state) => ({
        jobs: [
          {
            ...jobData,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            candidacyDate: jobData.candidacyDate || new Date().toISOString(),
          },
          ...state.jobs
        ]
      })),
      deleteJob: (id) => set((state) => ({
        jobs: state.jobs.filter((j) => j.id !== id)
      })),
      updateJobStatus: (id, status) => set((state) => ({
        jobs: state.jobs.map((j) => j.id === id ? { ...j, status } : j)
      })),
    }),
    {
      name: "demo-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
