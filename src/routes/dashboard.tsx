import { createSignal, For, Show } from "solid-js";
import * as data from "~/data/projects.json";
import { ProjectData } from "~/types/data";

const { projects } = data;

export default function DashboardPage() {
  return (
    <main class="lg:grid lg:grid-cols-2 max-w-7xl mx-auto gap-6 p-3 xl:p-0 py-12 xl:pb-12">
      <div class="mx-auto text-center text-2xl text-neutral-300 mb-12 col-span-2 uppercase tracking-widest">
        Dashboard
      </div>

      <For each={projects}>
        {(project: ProjectData) => {
          const [editEnabled, setEditEnabled] = createSignal<boolean>(true);

          return (
            <div class="mt-3 lg:mt-0">
              <div class="px-3 py-2 bg-neutral-100 flex justify-between items-center rounded">
                <div class="flex gap-6 items-center">
                  <div class="w-[24px] flex justify-center">
                    <img
                      src={project.clientLogo}
                      class="max-w-[36px] max-h-[12px] brightness-0"
                    />
                  </div>
                  {project.title}
                </div>
                <button
                  class="cursor-pointer text-xs bg-neutral-950 hover:bg-neutral-300 rounded text-white px-2 py-1"
                  onClick={() => setEditEnabled(!editEnabled())}
                >
                  Open
                </button>
              </div>
              <Show when={editEnabled()}>
                <div class="grid gap-3 mt-3 md:mt-1 bg-neutral-100 p-3 rounded">
                  <For each={Object.keys(project) as Array<keyof ProjectData>}>
                    {(key) => {
                      if (key !== "keypoints") {
                        let value = project[key] as string;
                        return (
                          <div class="flex gap-3 items-center">
                            <label class="text-neutral-500">{key}</label>
                            <input
                              class="rounded px-2 py-1 bg-white w-full"
                              type="text"
                              value={value}
                            />
                          </div>
                        );
                      }
                    }}
                  </For>
                </div>
              </Show>
            </div>
          );
        }}
      </For>
    </main>
  );
}
