import ProjectGrid from "~/components/ProjectGrid";
import { Project } from "~/types/data";
import { getRemoteData } from "~/utils/server_utils";
import { createEffect, createResource, Show } from "solid-js";
import Loading from "~/components/Loading";

export default function Home() {
  const [projects] = createResource<Project[]>(getRemoteData);
  let y: Project;
  createEffect(() => {
    if (projects()) {
      let z = (projects() as Project[])[0];
      y = z;
    }
  });

  return (
    <Show when={projects()} fallback={<Loading />}>
      <main class="mx-auto">
        <div class="py-6 lg:py-24 px-4 2xl:px-0 border-b border-neutral-900 bg-gradient-to-tr from-black to-neutral-900 flex items-center">
          <div class="rounded max-w-5xl lg:flex grid gap-6 lg:gap-0 justify-between items-center mx-auto text-center lg:text-left">
            <div class="w-full grid mx-auto text-neutral-300">
              <div class="w-full grid gap-2 lg:border-t border-neutral-900 py-12">
                <h1 class="2xl:pl-4 text-neutral-50 text-5xl tracking-tight font-bold">
                  Hey! I'm Mike. <span class="invert hue-rotate-110 brightness-80">🤘</span>
                </h1>
                <h3 class="2xl:pl-4 text-xl lg:text-3xl">
                  I'm an{" "}
                  <span class="font-bold text-rose-400 cursor-pointer hover:underline">
                    Art Director
                  </span>{" "}
                  and{" "}
                  <span class="font-bold cursor-pointer hover:underline">
                    web developer
                  </span>
                  .{" "}
                </h3>
              </div>
              <div class="">
                <p class="lg:mr-4 backdrop-brightness-150 p-4 rounded-xl text-neutral-400 border border-neutral-900 border-dashed max-w-3xl xl:max-w-[100vw] text-center lg:text-left">
                  I specialize in visual design, advertising campaigns, web
                  development, editing & motion graphics, and digital marketing.{" "}
                  <strong>Reach out! I'd love to help build your idea.</strong>
                </p>
              </div>
            </div>
            <div class="">
              <div class="transition-all duration-1000 ease-in-out h-full w-full mx-auto max-w-[360px] lg:max-w-[540px] max-h-[360px] overflow-hidden">
                <img
                  src="https://cdn.mikeangelo.art/me-on-thing.jpg"
                  class="hover:scale-225 object-cover w-full saturate-0 -translate-x-8 -translate-y-0 scale-200 duration-1000 transition-all ease-in-out"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-neutral-950 p-4 lg:p-12 2xl:p-24">
          <ProjectGrid data={projects()!} />
        </div>
      </main>
    </Show>
  );
}
