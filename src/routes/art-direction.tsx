import { For, JSXElement } from "solid-js";
import * as DB from "../db.json";

interface ImageGridCellProps {
  width?: number;
  colspan?: number;
  featuredImage: string;
}

function ImageGridCell(props: ImageGridCellProps) {
  let { colspan, width, featuredImage } = props;
  return (
    <div
      class={`w-[${width}%] ${
        colspan ? `col-span-${colspan}` : null
      } cursor-pointer hover:scale-102 hover:-translate-y-1 shadow-lg shadow-transparent hover:shadow-neutral-950 transition-all duration-1000 ease-out`}
    >
      <img
        class="h-100 w-full object-cover max-h-[288px] lg:max-h-[360px] overflow-hidden"
        src={featuredImage}
      />
    </div>
  );
}

export default function ArtDirection() {
  return (
    <main class="w-full p-3 2xl:p-0 max-w-7xl mx-auto">
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-center items-center w-full">
        <For each={DB.projects}>
          {(project, index) => {
            if (index() === 0) {
              return (
                <>
                  <ImageGridCell colspan={2} featuredImage={project.featured} />
                </>
              );
            } else {
              return (
                <>
                  {" "}
                  <ImageGridCell featuredImage={project.featured} />
                </>
              );
            }
          }}
        </For>
      </div>
    </main>
  );
}
