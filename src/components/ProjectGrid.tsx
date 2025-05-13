import { A } from "@solidjs/router";
import { For } from "solid-js";
import { ProjectData } from "./ProjectContainer";

interface ProjectGridProps {
  data: ProjectData[];
}

interface ImageGridCellProps {
  colspan?: number;
  project: ProjectData;
}

function ImageGridCell(props: ImageGridCellProps) {
  let { colspan, project } = props;
  let { featured, accentColor, clientLogo, id } = project;

  //let emblemStyle = `background-color: ${accentColor}`;
  let containerStyle = `grid-column: span ${colspan} / span ${colspan}`;

  return (
    <div
      class="hover:z-100 cursor-pointer hover:scale-105 hover:-translate-y-4 shadow-xl brightness-90 hover:brightness-110 shadow-transparent hover:shadow-neutral-950 transition-all duration-3000 ease-out"
      style={containerStyle}
    >
      {" "}
      <A href={`/project?id=${id}`}>
        <div class="absolute backdrop-blur backdrop-brightness-90 rounded-lg m-2 max-w-[60px] max-h-[60px] h-full w-full flex justify-center items-center">
          <img
            class="p-4 max-h-[60px] max-w-[84px] translate-z-1"
            src={clientLogo}
          />
        </div>

        <img
          class="h-100 w-full object-cover max-h-[288px] lg:max-h-[360px] overflow-hidden"
          src={featured}
        />
      </A>
    </div>
  );
}

export default function ProjectGrid(props: ProjectGridProps) {
  let { data } = props;
  return (
    <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-center items-center w-full">
      <For each={data}>
        {(project, index) => {
          if (index() === 0) {
            return (
              <>
                <ImageGridCell colspan={2} project={project} />
              </>
            );
          } else {
            return (
              <>
                {" "}
                <ImageGridCell project={project} />
              </>
            );
          }
        }}
      </For>
    </div>
  );
}
