import { createEffect, createSignal, For, Show } from "solid-js";
import { renderMedia } from "./utils";
import ProjectKeypoints from "./ProjectKeypoints";

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

interface ProjectProps {
  data: ProjectData;
}

export default function ProjectPage({ data }: ProjectProps) {
  const { id, client, accentColor, title, tags, featured, summary, keypoints, clientLogo } =
    data;
  const [projectOpen, setProjectOpen] = createSignal<boolean>(true);

  /*
  createEffect(() => {
    let button = document.getElementById(
      `project-${id.toString()}-button`
    ) as HTMLButtonElement;

    if (projectOpen()) {
      button.style.backgroundColor = "#fafafa";
      button.style.color = "#171717";
      button.style.border = "1px solid #171717";
    } else {
      button.style.backgroundColor = "";
      button.style.color = "";
      button.style.border = "";
    }
  });
  */

  return (
    <>
      <div class="max-w-7xl mx-auto px-3 xl:px-0 pb-12 lg:pb-8">
        <div class="grid gap-3 py-12">
          <div
            class="flex gap-3 items-center justify-between rounded-lg shadow-md shadow-neutral-400 px-3 py-3"
            style={`background-color: ${accentColor};`}
          >
            <img class="max-h-[36px] max-w-[144px]" src={clientLogo} />
            <h3 class="text-xl uppercase tracking-widest text-neutral-50">
              {client}
            </h3>
          </div>
          <div class="mt-6">
            <h2 class="text-3xl lg:text-5xl font-bold">{title}</h2>
          </div>
          <div class="flex gap-1 items-center">
            <For each={tags}>
              {(tag) => {
                return (
                  <div class="cursor-default bg-neutral-300 px-3 rounded-lg text-sm text-neutral-50">
                    {tag}
                  </div>
                );
              }}
            </For>
          </div>
        </div>
        <div class="lg:flex">
          <div class="w-full mb-3 lg:mb-0">{renderMedia(featured)}</div>
          <div class="w-full">
            <div class="p-3 lg:ml-3 ring ring-neutral-200 rounded-lg">
              <p>{summary}</p>
              {/*<button
                id={`project-${id.toString()}-button`}
                class="bg-neutral-950 hover:bg-neutral-300 mt-3 px-3 py-1 cursor-pointer rounded text-neutral-50"
                onClick={() => {
                  setProjectOpen(!projectOpen());
                }}
              >
                {projectOpen() ? "Close" : "See More"}
              </button>*/}
            </div>
          </div>
        </div>
      </div>
      <Show when={projectOpen()}>
        <ProjectKeypoints data={keypoints} projectId={id} />
      </Show>
    </>
  );
}
