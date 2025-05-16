export type ProjectData = {
  id: number;
  client: string;
  clientLogo: string;
  accentColor: string;
  title: string;
  tags: string[];
  featured: string;
  summary: string;
  keypoints: {
    id: number;
    featured: string[];
    title: string;
    summary: string;
  }[];
};