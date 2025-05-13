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

export default function ProjectContainer({ data }: ProjectProps) {
  const { id, client, accentColor, title, tags, featured, summary, keypoints } =
    data;
    const accentColorLite = () => {
      var accentColorLite = accentColor.replace("#", "");
      const r = parseInt(accentColorLite.substring(0, 2), 16);
      const g = parseInt(accentColorLite.substring(2, 4), 16);
      const b = parseInt(accentColorLite.substring(4, 6), 16);
      return (`rgba(${r}, ${g}, ${b}, 0.025)`)
    }
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
      <div class="max-w-7xl mx-auto px-3 xl:px-0 pb-3">
        <div class="grid gap-3 py-12">
          <div class="border-l-8 border-b border-b-neutral-100 px-3" style={`border-left-color: ${accentColor};`}>
            <h3 class="text-xl uppercase tracking-widest text-neutral-300">{client}</h3>
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
          <div class="lg:w-[66.6%] mb-3 lg:mb-0">
            {renderMedia(featured)}
          </div>
          <div class="lg:w-[33.3%]">
            <div class="p-3 lg:ml-3 ring ring-neutral-200 rounded">
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
        <ProjectKeypoints data={keypoints} projectId={id} />
      </Show>
    </>
  );
}
