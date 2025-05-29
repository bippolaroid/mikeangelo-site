import {
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { Project, ProjectFactory } from "~/types/data";
import { getData, sendDataToServer } from "~/utils/data_utils";

export default function DashboardPage() {
  const [projects, loadData] = createResource<Project[]>(getData);

  createEffect(() => {});
  return (
    <Show when={projects()}>
      <main class="lg:grid lg:grid-cols-2 max-w-7xl mx-auto gap-6 p-3 xl:p-0 py-12 xl:pb-12">
        <div class="mx-auto text-center text-2xl text-neutral-300 mb-12 col-span-2 uppercase tracking-widest">
          Creator Dashboard
        </div>

        <For each={projects()}>
          {(project: Project, projectIndex) => {
            const [editEnabled, setEditEnabled] = createSignal<boolean>(false);
            let { client_logo, title, id } = project;

            return (
              <div class="mt-3 lg:mt-0">
                <div class="p-6 text-xl bg-neutral-300 flex justify-between items-center rounded-tr rounded-tl">
                  <div class="flex gap-6 items-center">
                    <div class="w-[24px] flex justify-center">
                      <img
                        src={client_logo}
                        class="max-w-[36px] max-h-[12px] brightness-0"
                      />
                    </div>
                    {title}
                  </div>
                  <button
                    class="cursor-pointer text-sm ring ring-neutral-500 bg-neutral-500 hover:bg-transparent hover:text-neutral-500 rounded text-white px-3 py-1"
                    onClick={() => setEditEnabled(!editEnabled())}
                  >
                    {editEnabled() ? "Close" : "Open"}
                  </button>
                </div>
                <Show when={editEnabled()}>
                  <div class="grid gap-6 bg-neutral-100 p-6 rounded-bl rounded-br">
                    <For each={Object.keys(project) as Array<keyof Project>}>
                      {(key) => {
                        if (key !== "keypoints") {
                          if (key === "id" || key === "tags") {
                            let value = project[key] as number;
                            return (
                              <div class="grid grid-cols-12 gap-3 w-full items-center">
                                <label class="lg:col-span-2 text-neutral-500 text-sm capitalize">
                                  {key}
                                </label>
                                <input
                                  id={`${key}-${id}`}
                                  class="rounded col-span-10 col-start-3 px-3 py-1 w-full"
                                  type="text"
                                  disabled
                                  value={value}
                                  onChange={(event) => {
                                    const { value } =
                                      event.target as HTMLInputElement;
                                    projects()![projectIndex()][key] =
                                      value as never;
                                  }}
                                />
                              </div>
                            );
                          } else {
                            let value = project[key] as string;
                            return (
                              <div class="grid grid-cols-12 gap-3 w-full items-center">
                                <label class="lg:col-span-2 text-neutral-500 text-sm capitalize">
                                  {key}
                                </label>
                                <input
                                  id={`${key}-${id}`}
                                  class="rounded col-span-10 col-start-3 px-3 py-1 bg-white w-full"
                                  type="text"
                                  value={value}
                                  onChange={(event) => {
                                    const { value } =
                                      event.target as HTMLInputElement;
                                    projects()![projectIndex()][key] =
                                      value as string;
                                  }}
                                />
                              </div>
                            );
                          }
                        }
                      }}
                    </For>
                    <div class="w-full flex justify-end">
                      <button
                        class="w-fit cursor-pointer bg-neutral-950 hover:bg-neutral-300 rounded text-white px-3 py-1"
                        onClick={() => {
                          sendDataToServer(projects()!, project.id);
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Show>
              </div>
            );
          }}
        </For>
        <div class="lg:col-span-2 flex justify-center">
          {" "}
          <button
            class="mt-3 lg:mt-0 text-xl w-fit cursor-pointer bg-neutral-950 hover:bg-neutral-300 rounded text-white px-4 py-3"
            onClick={() => {
              let newProjectId = projects()!.length;
              const newProject = new ProjectFactory().default(newProjectId);
              projects()![newProjectId] = newProject;
              sendDataToServer(projects()!, newProjectId);
            }}
          >
            Add Project
          </button>
        </div>
      </main>
    </Show>
  );
}
