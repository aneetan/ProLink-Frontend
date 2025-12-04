export interface Project {
  id?: number;
  title: string;
  description: string;
  completionDate: string;
  projectUrl?: string;
  imageUrl?: string;
  userId?: number| null;
}