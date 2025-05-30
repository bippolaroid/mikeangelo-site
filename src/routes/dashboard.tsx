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
  const [collections, loadCollections] = createResource<Project[]>(getData);

  createEffect(() => {});
  return (
    <Show when={collections()}>
      <main class="lg:grid lg:grid-cols-2 max-w-7xl mx-auto gap-6 p-3 xl:p-0 py-12 xl:pb-12">
        <div class="mx-auto grid gap-3 text-center mb-12 col-span-2">
          <div class="text-5xl text-neutral-300">
            Creator Dashboard
          </div>
          <div class="mx-auto min-w-24 w-fit p-1 rounded-full text-xs ring ring-green-500 bg-green-200 text-green-500">Up to date</div>
        </div>

        <For each={collections()}>
          {(project: Project, projectIndex) => {
            let { client_logo, title, id } = project;

            return (
              <div class="grid gap-3 border border-neutral-200 py-3 px-5 rounded mt-3">
                <div class="flex items-center">
                  <div class="w-full grid py-3">
                    <label
                      id={`${id}-title-label`}
                      class="text-neutral-300 text-xs uppercase"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id={`${id}-title`}
                      value={`${title}`}
                      class="w-full text-2xl text-neutral-700 hover:text-neutral-500 focus:text-neutral-500 focus:outline-0"
                      onMouseOver={(event) => {
                        let field = event.target;
                        if (document.activeElement !== field) {
                          let label = document.getElementById(
                            `${event.target.id}-label`
                          ) as HTMLLabelElement;
                        }
                      }}
                      onMouseOut={(event) => {
                        let field = event.target;
                        if (document.activeElement !== field) {
                          let label = document.getElementById(
                            `${event.target.id}-label`
                          ) as HTMLLabelElement;
                        }
                      }}
                      onFocusIn={(event) => {
                        let label = document.getElementById(
                          `${event.target.id}-label`
                        ) as HTMLLabelElement;
                        label!.style.color = "#404040";
                      }}
                      onFocusOut={(event) => {
                        let label = document.getElementById(
                          `${event.target.id}-label`
                        ) as HTMLLabelElement;
                        label!.style.color = "#d4d4d4";
                      }}
                      onFocus={(event) => {
                        let target = event.target as HTMLInputElement;
                        target.setSelectionRange(0, 100, "forward");
                      }}
                    />
                  </div>
                </div>
                <For each={Object.keys(project) as Array<keyof Project>}>
                  {(key) => {
                    //switch
                    if (key !== "keypoints") {
                      if (key === "id" || key === "tags") {
                        let value = project[key] as number;
                        return (
                          <div class="grid grid-cols-12 gap-3 w-full items-center">
                            <label class="lg:col-span-2 text-neutral-500 text-sm">
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
                                collections()![projectIndex()][key] =
                                  value as never;
                              }}
                            />
                          </div>
                        );
                      } else {
                        let value = project[key] as string;
                        return (
                          <div class="grid grid-cols-1 gap-1 w-full items-center">
                            <label
                              id={`${key}-${id}-label`}
                              class="text-neutral-300 text-xs uppercase"
                            >
                              {key}
                            </label>
                            <input
                              id={`${key}-${id}`}
                              class="px-3 py-1 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 rounded ring ring-neutral-200 hover:ring-neutral-300 focus:outline-0 focus:ring-neutral-500 bg-white w-full"
                              type="text"
                              value={value}
                              onChange={(event) => {
                                const { value } =
                                  event.target as HTMLInputElement;
                                collections()![projectIndex()][key] =
                                  value as string;
                              }}
                              onFocusIn={(event) => {
                                let label = document.getElementById(
                                  `${event.target.id}-label`
                                ) as HTMLLabelElement;
                                label!.style.color = "#404040";
                              }}
                              onFocusOut={(event) => {
                                let label = document.getElementById(
                                  `${event.target.id}-label`
                                ) as HTMLLabelElement;
                                label!.style.color = "#d4d4d4";
                              }}
                              onFocus={(event) => {
                                let target = event.target as HTMLInputElement;
                                target.setSelectionRange(0, 100, "forward");
                              }}
                            />
                          </div>
                        );
                      }
                    }
                  }}
                </For>
                  <div class="w-full justify-between py-3 flex gap-3">
                  <button
                    class="w-fit cursor-pointer bg-neutral-950 hover:bg-neutral-700 rounded text-white px-3 py-1"
                    onClick={() => {
                      sendDataToServer(collections()!, project.id);
                    }}
                  >
                    Save
                  </button>
                  <button
                    class="w-fit cursor-pointer bg-red-500 hover:bg-red-400 rounded text-white px-3 py-1"
                    onClick={() => {
                      sendDataToServer(collections()!, project.id);
                    }}
                  >
                    Delete
                  </button>
                  </div>
              </div>
            );
          }}
        </For>
        <div class="lg:col-span-2 flex justify-center">
          {" "}
          <button
            class="mt-3 lg:mt-0 text-xl w-fit cursor-pointer bg-neutral-950 hover:bg-neutral-300 rounded text-white px-4 py-3"
            onClick={() => {
              let newProjectId = collections()!.length;
              const newProject = new ProjectFactory().default(newProjectId);
              collections()![newProjectId] = newProject;
              sendDataToServer(collections()!, newProjectId);
            }}
          >
            Add Project
          </button>
        </div>
      </main>
    </Show>
  );
}
