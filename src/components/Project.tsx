import { createEffect, createSignal, For, Show } from "solid-js";
import ProjectExpanded from "./ProjectKeypoints";

type ProjectData = {
  id: number;
  client: string;
  accentColor: string;
  title: string;
  tags: string[];
  featured: string;
  summary: string;
  keypoints: {
    id: number;
    featured: string;
    title: string;
    summary: string;
  }[];
};

interface ProjectProps {
  data: ProjectData;
}

export default function Project({ data }: ProjectProps) {
  const { id, client, accentColor, title, tags, featured, summary, keypoints } =
    data;
  const [projectOpen, setProjectOpen] = createSignal<boolean>(false);

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

  return (
    <>
      <div class="max-w-7xl mx-auto px-3 pb-3">
        <div class="grid gap-3 py-12">
          <div class="border-l-8 px-3" style={`border-color: ${accentColor}`}>
            <h3 class="text-xl uppercase tracking-widest">{client}</h3>
          </div>
          <div>
            <h2 class="text-3xl">{title}</h2>
          </div>
          <div class="flex gap-1 items-center">
            <For each={tags}>
              {(tag) => {
                return (
                  <div class="cursor-default bg-neutral-300 px-3 rounded text-sm text-neutral-50">
                    {tag}
                  </div>
                );
              }}
            </For>
          </div>
        </div>
        <div class="lg:flex">
          <div class="mb-3 lg:mb-0">
            <video
              controls
              class="w-full lg:min-w-[960px]"
              src={`${featured}`}
            ></video>
          </div>
          <div>
            <div class="p-3 lg:ml-3 ring ring-neutral-200 rounded min-w-sm">
              <p>{summary}</p>
              <button
                id={`project-${id.toString()}-button`}
                class="bg-neutral-950 hover:bg-neutral-300 mt-3 px-3 py-1 cursor-pointer rounded text-neutral-50"
                onClick={() => {
                  setProjectOpen(!projectOpen());
                }}
              >
                {projectOpen() ? "Close" : "See More"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Show when={projectOpen()}>
        <ProjectExpanded data={keypoints} />
      </Show>
    </>
  );
}
