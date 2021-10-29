export type ApplicationStatusId = string;

export type ApplicationStatus = {
  id: ApplicationStatusId;
  content: string;
}

export type CommentId = string;
export type ApplicationId = string;

export type Comment = {
  id: CommentId;
  content: string;
  createdAt: string;
  applicationId: ApplicationId;
}

export type Application = {
  id: ApplicationId;
  company: string;
  position: string;
  link?: string;
  description?: string;
  status: ApplicationStatus;
  createdAt: string;
  comments?: Comment[];
  slug: string;
}