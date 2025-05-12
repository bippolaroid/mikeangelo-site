import { JSXElement } from "solid-js";
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
      class={`w-[${width}%] ${colspan ? `grid-cols${colspan}` : null} cursor-pointer hover:scale-102 shadow-lg shadow-transparent hover:shadow-neutral-950 transition-all duration-1000 ease-out`}
    >
      <img
        class="h-100 w-full object-cover max-h-[144px] md:max-h-[288px] lg:max-h-[360px] overflow-hidden"
        src={featuredImage}
      />
    </div>
  );
}

export default function ArtDirection() {
  return (
    <main class="w-full p-3 2xl:p-0 max-w-7xl mx-auto">
      <div class="grid grid-cols-4 gap-1 justify-center items-center w-full">
        <div class="col-span-2">
        <ImageGridCell colspan={2} featuredImage="./me.jpeg" />
        </div>
        <ImageGridCell featuredImage="./me.jpeg" />
        <ImageGridCell featuredImage="./me.jpeg" />
      </div>
    </main>
  );
}
