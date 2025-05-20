import { A } from "@solidjs/router";
import { For, onCleanup, onMount } from "solid-js";
import { ProjectData } from "~/types/data";

interface ProjectGridProps {
  data: ProjectData[];
}

interface ProjectCellProps {
  project: ProjectData;
  colspan?: number;
}

function ProjectCell(props: ProjectCellProps) {
  let { colspan, project } = props;
  let { featured, accentColor, clientLogo, id, title } = project;

  return (
    <div
      style={`grid-column: span ${colspan} / span ${colspan}`}
      class="hover:z-100 overflow-hidden cursor-pointer max-h-[324px] hover:scale-110 hover:-translate-y-4 md:hover:-translate-y-12 shadow-xl brightness-90 hover:brightness-110 shadow-transparent hover:shadow-neutral-700 transition-all duration-3000 ease-out"
      onMouseEnter={() => {
        document.getElementById(`client-tag-${id}`)!.style.opacity = "100";
        document.getElementById(`client-emblem-${id}`)!.style.backgroundColor =
          accentColor;
      }}
      onMouseLeave={() => {
        document.getElementById(`client-tag-${id}`)!.style.opacity = "0";
        document.getElementById(`client-emblem-${id}`)!.style.backgroundColor =
          "transparent";
      }}
    >
      {" "}
      <A href={`/project?id=${id}`}>
        <div class="absolute flex h-full m-2 gap-2 max-h-[60px]">
          <div
            id={`client-emblem-${id}`}
            class="backdrop-blur backdrop-brightness-90 rounded-lg max-w-[60px] ring ring-[rgb(0,0,0,0.1)] max-h-[60px] h-full w-full flex justify-center items-center transition-all duration-3000 ease-out"
          >
            <img
              class="brightness-500 saturate-0 contrast-500 p-4 max-h-[60px] max-w-[84px]"
              src={clientLogo}
            />
          </div>
          <div
            id={`client-tag-${id}`}
            class="opacity-0 uppercase text-neutral-700 tracking-widest text-sm transition-all duration-3000 ease-out backdrop-blur-xl ring ring-[rgb(0,0,0,0.1)] backdrop-brightness-125 rounded-lg p-4 h-full flex items-center"
          >
            {title}
          </div>
        </div>

        <img
          class="h-90 transition-all duration-3000 ease-out w-full object-cover overflow-hidden"
          src={featured}
        />
      </A>
    </div>
  );
}

export default function ProjectGrid(props: ProjectGridProps) {
  let { data } = props;

  // refactor to algorithm based on length of projects
  let grid = [0, 3, 4, 7, 8, 11, 12];

  return (
    <div class="max-w-7xl my-12 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-center items-center w-full">
      <For each={data}>
        {(project) => {
          let colspan;
          if (grid.includes(project.id)) {
            
            colspan = 2;
          } else {
            colspan = 1;
          }
          return <ProjectCell colspan={colspan} project={project} />;
        }}
      </For>
    </div>
  );
}
