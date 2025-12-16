export class CreateJobDto {
  title: string;
  company: string;
  location?: string;
  comment?: string;
  email?: string;
  phone?: string;
  description?: string;
  redirectUrl?: string;
  candidacyDate?: Date;
  interviewDate?: Date;
  followUpDate?: Date;
}
