import { createSignal, For, Show } from "solid-js";
import * as data from "~/data/projects.json";
import { ProjectData } from "~/types/data";

const FOLIO_SERVER_ADDR = import.meta.env.VITE_SERVER_ADDR;

const { projects } = data;
let mutableData: ProjectData[] = projects;

function sendDataToServer(index: number) {
  fetch(`http://${FOLIO_SERVER_ADDR}/api/projects`, {
    method: "POST",
    body: JSON.stringify(mutableData[index]),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      return response;
    })
    .then((data) => {
      console.log("Successfully sent data:", data);
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}

export default function DashboardPage() {
  return (
    <main class="lg:grid lg:grid-cols-2 max-w-7xl mx-auto gap-6 p-3 xl:p-0 py-12 xl:pb-12">
      <div class="mx-auto text-center text-2xl text-neutral-300 mb-12 col-span-2 uppercase tracking-widest">
        Dashboard
      </div>

      <For each={mutableData}>
        {(project: ProjectData) => {
          const [editEnabled, setEditEnabled] = createSignal<boolean>(true);
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
                  <For each={Object.keys(project) as Array<keyof ProjectData>}>
                    {(key) => {
                      if (key !== "keypoints") {
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
                            />
                          </div>
                        );
                      }
                    }}
                  </For>
                  <div class="w-full flex justify-end">
                    <button
                      class="w-fit cursor-pointer bg-neutral-950 hover:bg-neutral-300 rounded text-white px-3 py-1"
                      onClick={() => {
                        sendDataToServer(project.id);
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
    </main>
  );
}
