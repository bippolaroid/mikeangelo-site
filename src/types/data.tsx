export type ProjectData = {
  id: number;
  client: string;
  client_logo: string;
  accent_color: string;
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