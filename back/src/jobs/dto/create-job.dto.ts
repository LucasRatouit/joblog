export class CreateJobDto {
  title: string;
  company: string;
  location?: string;
  description?: string;
  email?: string;
  phone?: string;
  candidacyDate?: Date;
  interviewDate?: Date;
  followUpDate?: Date;
}
