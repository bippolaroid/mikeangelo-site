import { A } from "@solidjs/router";
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  onCleanup,
  onMount,
} from "solid-js";
import { Project } from "~/types/data";

interface ProjectGridProps {
  data: Project[];
}

interface ProjectCellProps {
  project: Project;
  colspan?: number;
}

function ProjectCell(props: ProjectCellProps) {
  let { colspan, project } = props;
  let { featured, accent_color, client_logo, id, title } = project;

  return (
    <div
      style={`grid-column: span ${colspan} / span ${colspan}`}
      class="hover:z-100 overflow-hidden cursor-pointer hover:scale-110 hover:-translate-y-2 md:hover:-translate-y-6 brightness-90 hover:brightness-110 transition-all duration-2000 ease-out"
      onMouseEnter={() => {
        document.getElementById(`client-tag-${id}`)!.style.opacity = "100";
        document.getElementById(`client-emblem-${id}`)!.style.backgroundColor =
          accent_color;
      }}
      onMouseLeave={() => {
        document.getElementById(`client-tag-${id}`)!.style.opacity = "0";
        document.getElementById(`client-emblem-${id}`)!.style.backgroundColor =
          "transparent";
      }}
    >
      <A href={`/project?id=${id}`}>
        <div class="absolute flex h-full m-2 gap-2 max-h-[60px]">
          <div
            id={`client-emblem-${id}`}
            class="backdrop-blur backdrop-brightness-90 rounded-xl max-w-[60px] ring ring-[rgb(0,0,0,0.1)] max-h-[60px] h-full w-full flex justify-center items-center transition-all duration-3000 ease-out"
          >
            <img
              class="brightness-500 saturate-0 contrast-500 p-4 max-h-[60px] max-w-[84px]"
              src={client_logo}
            />
          </div>
          <div
            id={`client-tag-${id}`}
            class="opacity-0 uppercase text-neutral-700 tracking-widest text-sm transition-all duration-3000 ease-out backdrop-blur-xl ring ring-[rgb(0,0,0,0.1)] backdrop-brightness-125 rounded-xl p-4 h-full flex items-center"
          >
            {title}
          </div>
        </div>
        <div class="overflow-clip max-h-80">
        <img
          class="h-90 transition-all duration-3000 ease-out w-full object-cover"
          src={featured}
        />
        </div>
      </A>
    </div>
  );
}

export default function ProjectGrid(props: ProjectGridProps) {
  const [gridArray, setGridArray] = createSignal<number[]>([]);

  function initGrid() {
    if (window.innerWidth >= 1024) {
      setGridArray([0, 5, 6, 11, 12]);
    } else {
      setGridArray([0, 3, 4, 7, 8, 11]);
    }
  }

  onMount(() => {
    initGrid();
    window.addEventListener("resize", initGrid);
    onCleanup(() => {
      window.removeEventListener("resize", initGrid);
    });
  });

  const computedData = createMemo(() => {
    const array = gridArray();
    return props.data.map((project) => ({
      project,
      colspan: array.includes(project.id) ? 2 : 1,
    }));
  });

  return (
    <div class="border-t border-b border-neutral-800 backdrop-brightness-112 rounded-xl max-w-7xl lg:p-12 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-center items-center w-full">
      <For each={computedData()}>
        {({ project, colspan }) => (
          <ProjectCell colspan={colspan} project={project} />
        )}
      </For>
    </div>
  );
}
