export type ApplicationStatus = {
  id: string;
  content: string;
}

export type Application = {
  id: string;
  company: string;
  position: string;
  link?: string;
  description?: string;
  status: ApplicationStatus;
  createdAt: string;
  slug: string;
}