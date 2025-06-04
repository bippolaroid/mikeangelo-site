import { UTCNow } from "~/utils/log_utils";

export class Project {
  id: number;
  client: string;
  client_logo: string;
  accent_color: string;
  title: string;
  tags: string[];
  featured: string;
  summary: string;
  keypoints: Keypoint[];
  last_modified: string;
  text_fields: TextField[]
  constructor(
    id: number,
    client: string,
    client_logo: string,
    accent_color: string,
    title: string,
    tags: string[],
    featured: string,
    summary: string,
    keypoints: Keypoint[],
    last_modified: string
  ) {
    this.id = id;
    this.client = client;
    this.client_logo = client_logo;
    this.accent_color = accent_color;
    this.title = title;
    this.tags = tags;
    this.featured = featured;
    this.summary = summary;
    this.keypoints = keypoints;
    this.last_modified = last_modified;
    this.text_fields = []
  }
}

export class TextField {
  id: number;
  name: string;
  value: string;
  constructor(id: number, name: string, value: string) {
    this.id = id;
    this.name = name;
    this.value = value;
  }
}

export class Keypoint {
  id: number;
  featured: string[];
  title: string;
  summary: string;
  constructor(id: number, featured: string[], title: string, summary: string) {
    this.id = id;
    this.featured = featured;
    this.title = title;
    this.summary = summary;
  }
}

export class ProjectFactory {
  default(id: number): Project {
      return new Project(
      id,
      `Client ${id}`,
      `https://`,
      `#cacaca`,
      `Project ${id}`,
      [`New`],
      `https://`,
      `New Project Description ${id}`,
      [new KeypointFactory().default(id)],
      UTCNow()
    );
  }
}

export class KeypointFactory {
  default(id: number): Keypoint {
    return new Keypoint(
      id,
      ["https://"],
      `Keypoint ${id}`,
      `Keypoint Summary ${id}`
    );
  }
}
