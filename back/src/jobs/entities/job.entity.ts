export class Job {
  id: string;
  title: string;
  company: string;
  status: JobStatus;
  location?: string;
  comment?: string;
  email?: string;
  phone?: string;
  description?: string;
  redirectUrl?: string;
  candidacyDate?: Date; // Date de candidature
  interviewDate?: Date; // Date d'entretien
  followUpDate?: Date; // Date de relance
}

export enum JobStatus {
  PENDING = 'En attente',
  INTERVIEW = 'Entretien',
  FOLLOW_UP = 'Relance',
  ACCEPTED = 'Accepté',
}
