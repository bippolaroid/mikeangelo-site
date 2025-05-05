import { createEffect, createSignal, Show } from "solid-js";
import ProjectExpanded from "./ProjectExpanded";

export default function Project() {
  const [projectOpen, setProjectOpen] = createSignal<boolean>(false);

  createEffect(() => {
    let button = document.getElementById("details") as HTMLButtonElement;

    if(projectOpen()) {
        button.style.backgroundColor = "#fafafa";
        button.style.color = "#171717";
        button.style.border = "1px solid #171717";
    } else {
        button.style.backgroundColor = "";
        button.style.color = "";
        button.style.border = "";
    }
  })

  return (
    <>
      <div class="max-w-7xl mx-auto px-3 pb-3">
        <div class="grid gap-3 py-12">
          <div class="border-l-8 border-amber-500 px-3">
            <h3 class="text-xl uppercase tracking-widest">Chubb</h3>
          </div>
          <div>
            <h2 class="text-3xl">Project Title</h2>
          </div>
          <div class="flex items-center">
            <div class="bg-neutral-300 px-3 rounded text-sm text-neutral-50">
              Art Director
            </div>
          </div>
        </div>
        <div class="lg:flex">
          <div class="mb-3 lg:mb-0">
            <video class="" src="./public/video-1.mp4"></video>
          </div>
          <div>
            <div class="p-3 lg:ml-3 ring ring-neutral-200 rounded min-w-sm">
              <p>
                This is a description of the project. You can say whatever you
                want here, it doesn't matter at all.
              </p>
              <button id="details"
                class="bg-neutral-950 hover:bg-neutral-300 mt-3 px-3 py-1 cursor-pointer rounded text-neutral-50"
                onClick={() => {
                  setProjectOpen(!projectOpen());
                }}
              >
                {projectOpen() ? "Close" : "Details"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Show when={projectOpen()}>
        <ProjectExpanded />
      </Show>
    </>
  );
}
