import ProjectGrid from "~/components/ProjectGrid";
import { Project } from "~/types/data";
import { getRemoteData } from "~/utils/data_utils";
import { createEffect, createResource, Show } from "solid-js";
import Loading from "~/components/Loading";

export default function Home() {
  const [projects] = createResource<Project[]>(getRemoteData);
let y: Project;
  createEffect(() => {
    if(projects()) {
      let z = (projects() as Project[])[0];
      y = z;
    }
  })

  return (
    <Show when={projects()} fallback={<Loading />}>
      <main class="mx-auto">
        <div class="px-4 2xl:px-0 border-b border-neutral-800 bg-gradient-to-br from-25% to-100% to-neutral-950 from-neutral-900 py-24 flex items-center">
          <div class="py-8 xl:py-0 rounded max-w-5xl lg:flex grid gap-6 justify-between items-center mx-auto text-center lg:text-left">
            <div class="rounded-xl transition-all duration-1000 ease-in-out h-full w-full mx-auto max-w-[360px] max-h-[360px] overflow-hidden">
              <img
                src="https://cdn.mikeangelo.art/me-on-thing.jpg"
                class="hover:scale-225 hover:-translate-x-12 object-cover w-full saturate-0 -translate-x-10 translate-y-5 scale-200 duration-1000 transition-all ease-in-out"
              />
            </div>
            <div class="w-full grid gap-2 mx-auto text-neutral-300">
              <div class="2xl:pl-4">
                <h1 class="text-neutral-50 text-5xl tracking-tight font-bold">
                  Hey! I'm Mike. 🤘
                </h1>
                <h3 class="text-xl lg:text-3xl">
                  I'm an{" "}
                  <span class="font-bold text-yellow-500 cursor-pointer hover:underline">
                    Art Director
                  </span>{" "}
                  and{" "}
                  <span class="font-bold text-amber-500 cursor-pointer hover:underline">
                    web developer
                  </span>
                  .{" "}
                </h3>
              </div>
              <p class="backdrop-brightness-200 p-6 rounded-lg text-neutral-300 max-w-3xl xl:max-w-[100vw] mb-4 mt-8 text-center lg:text-left">
                I specialize in visual design, advertising campaigns, web development, editing & motions graphics, and digital marketing. <strong>Reach out! I'd love
                to help build your idea.</strong>
              </p>
            </div>
          </div>
        </div>
        <div class="bg-black px-4 py-24 2xl:px-0">
                          <h1 class="text-center text-neutral-800 text-5xl mb-6 tracking-widest uppercase font-light">Portfolio</h1>
          <ProjectGrid data={projects()!} />
        </div>
      </main>
    </Show>
  );
}
