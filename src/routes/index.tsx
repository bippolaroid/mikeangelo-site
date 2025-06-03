import { A } from "@solidjs/router";
import ProjectGrid from "~/components/ProjectGrid";
import { Project } from "~/types/data";
import { getLocalData, getRemoteData } from "~/utils/data_utils";
import { createResource, Show } from "solid-js";

export default function Home() {
  const [projects, loadProjects] = createResource<Project[]>(getLocalData);

  return (
    <Show when={projects()}>
      <main class="p-4 mx-auto">
        <div class=" lg:pb-10 border-b border-neutral-300 bg-gradient-to-t from-neutral-100 to-neutral-50 py-12 flex items-center">
          <div class="max-w-7xl lg:flex grid gap-3 lg:gap-6 justify-between items-center mx-auto text-center lg:text-left">
            <div class="h-full w-full mx-auto max-w-[360px] hover:scale-95 shadow-lg shadow-transparent hover:shadow-neutral-300 transition-all duration-3000 ease-out bg-gradient-to-tr from-blue-500 via-purple-500 to-yellow-500 row-start-2 max-h-[360px] overflow-hidden rounded-full">
              <img
                src="https://pub-9edaa7810b9a41c4ad3e323fc3af3bfa.r2.dev/me-on-thing.jpg"
                class="hover:scale-205 hover:blur-[1px] rounded-full object-cover w-full hover:opacity-30 hover:contrast-30 hover:saturate-0 transition-all duration-3000 ease-out -translate-x-10 translate-y-5 scale-200"
              />
            </div>
            <div class="w-full">
              <h1 class="text-5xl lg:text-7xl tracking-tight font-bold mb-4">
                Hello! I'm Mike 🤘
              </h1>
              <h3 class="text-xl lg:text-3xl">
                I'm an{" "}
                <span class="font-bold text-neutral-950">Art Director</span> and{" "}
                <span class="font-bold text-neutral-950">web developer</span> in
                New Jersey.
              </h3>

              <p class="text-lg max-w-3xl xl:max-w-[100vw] mb-4 mt-4 text-center lg:text-left">
                I specialize in design, editing, advertising campaigns, digital
                marketing, and web design & development. Please{" "}
                <A
                  class="underline text-neutral-950 hover:text-neutral-300 font-bold"
                  href="./#footer"
                >
                  reach out!
                </A>{" "}
                I'd love to help build your idea.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <ProjectGrid data={projects()!} />
        </div>
      </main>
    </Show>
  );
}
