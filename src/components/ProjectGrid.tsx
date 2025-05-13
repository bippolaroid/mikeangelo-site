import { A } from "@solidjs/router";
import { For } from "solid-js";
import { ProjectData } from "./ProjectPage";

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
      class="hover:z-100 rounded-2xl overflow-hidden cursor-pointer md:hover:scale-110 hover:-translate-y-4 md:hover:-translate-y-12 shadow-xl brightness-90 hover:brightness-110 shadow-transparent hover:shadow-neutral-700 transition-all duration-3000 ease-out"
      style={containerStyle}
    >
      {" "}
      <A href={`/project?id=${id}`}>
        <div class="absolute backdrop-blur backdrop-brightness-90 rounded-lg m-2 max-w-[60px] ring ring-transparent max-h-[60px] h-full w-full flex justify-center items-center">
          <img
            class="p-4 max-h-[60px] max-w-[84px]"
            src={clientLogo}
          />
        </div>

        <img
          class="h-100 transition-all duration-3000 ease-out w-full object-cover max-h-[288px] lg:max-h-[360px] overflow-hidden"
          src={featured}
        />
      </A>
    </div>
  );
}

export default function ProjectGrid(props: ProjectGridProps) {
  let { data } = props;
  return (
    <div class="max-w-7xl my-12 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center items-center w-full">
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
