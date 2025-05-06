import { For } from "solid-js";
import { renderMedia } from "./utils";

type Keypoint = {
  keypoint: ProjectKeypointProps;
  projectId: number;
};

export interface ProjectKeypointProps {
  id: number;
  featured: string[];
  title: string;
  summary: string;
}

export function ProjectKeypoint({ keypoint, projectId }: Keypoint) {
  if (keypoint.featured.length > 1) {
    return (
      <div class="max-w-5xl mx-auto xl:px-0 px-3 pb-3">
        <h2 class="text-3xl py-12 text-neutral-500">
          {keypoint.title}
        </h2>
        <div class="grid grid-cols-2 gap-1">
          <For each={keypoint.featured}>{(media) => renderMedia(media)}</For>
        </div>
        <div class="mt-3">
          <p class="lg:py-3">{keypoint.summary}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div class="max-w-5xl mx-auto py-3 xl:px-0 px-3">
        <div class="grid gap-6 lg:flex justify-center items-center">
          <div>
            <h2 class="text-3xl py-6 text-neutral-500">
              {keypoint.title}
            </h2>
            <p class="lg:p-3 max-w-3xl mx-auto lg:border-l border-neutral-300 pb-3">
              {keypoint.summary}
            </p>
          </div>
          <div class="mx-auto max-w-3xl w-full">
            {renderMedia(keypoint.featured[0])}
          </div>
        </div>
      </div>
    );
  }
}
