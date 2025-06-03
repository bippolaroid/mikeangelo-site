import { A } from "@solidjs/router";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import { Project, ProjectFactory } from "~/types/data";
import {
  createCollection,
  deleteCollection,
  getLocalData,
  getRemoteData,
} from "~/utils/data_utils";
import ProjectGrid from "./ProjectGrid";

export default function Dashboard() {
  const [collections, loadCollections] =
    createResource<Project[]>(getLocalData);
  const [remoteCollections, loadRemoteCollections] =
    createResource<Project[]>(getRemoteData);
  const [syncStatus, setSyncStatus] = createSignal<boolean>(false);
  const [refreshSignal, setRefreshSignal] = createSignal<boolean>(false);

  createEffect(() => {
    if (refreshSignal()) {
      loadCollections.refetch();
      setTimeout(() => {
        setRefreshSignal(false);
      }, 10);
    }
    if (collections() && remoteCollections()) {
      if (collections() === remoteCollections()) setSyncStatus(true);
      else setSyncStatus(false);
    }
  });
  return (
    <main class="max-w-7xl lg:grid lg:grid-cols-2 py-12 mx-auto">
      <div class="mx-auto grid gap-4 text-center mb-12 col-span-2">
        <div class="text-5xl text-neutral-300">Creator Dashboard</div>
        {syncStatus() ? (
          <div class="mx-auto min-w-24 w-fit px-4 py-2 rounded-full text-xs ring ring-green-500 bg-green-200 text-green-500">
            Cloud is up to date!
          </div>
        ) : (
          <div class="mx-auto min-w-24 w-fit px-4 py-2 rounded-full text-xs ring ring-red-500 bg-red-200 text-red-500">
            Cloud is out of sync.
          </div>
        )}
      </div>
      <Show when={collections()}>
        <div class="grid grid-cols-5 col-span-2 items-center gap-4 ring ring-neutral-300 rounded p-6 w-full">
          <For each={collections()}>
            {(project: Project) => {
              return (
                <>
                  <div class="flex col-span-3 items-center w-full">
                    <div class="pr-4">
                      <img
                        class="saturate-0 brightness-0"
                        src={project.client_logo}
                        width="36"
                        height="auto"
                      />
                    </div>
                    <div>
                      <A
                        class="text-xl underline hover:no-underline"
                        href={`/project?id=${project.id}`}
                      >
                        {project.title}
                      </A>
                    </div>
                  </div>
                  <div class="w-full">{project.last_modified}</div>
                  <div class="w-full flex justify-end gap-4">
                    <A
                      class="text-xl underline hover:no-underline"
                      href={`/edit?id=${project.id}`}
                    >
                      Edit
                    </A>
                    <A
                      class="text-xl underline hover:no-underline"
                      href=""
                      onclick={() => {
                        deleteCollection(project);
                        setRefreshSignal(true);
                      }}
                    >
                      Delete
                    </A>
                  </div>
                </>
              );
            }}
          </For>
        </div>
        <div class="lg:col-span-2 flex justify-center">
          {" "}
          <button
            class="mt-4 text-xl w-fit cursor-pointer bg-neutral-950 hover:bg-neutral-700 rounded text-white px-4 py-3"
            onClick={() => {
              let newProjectId = (collections() as Project[]).length;
              const newProject = new ProjectFactory().default(newProjectId);
              createCollection(newProject);
              setRefreshSignal(true);
            }}
          >
            Add Project
          </button>
        </div>
        <div class="col-span-2 grid mt-12">
          <div class="pb-4 w-full flex justify-center border-b border-neutral-300"><h1 class="text-5xl text-neutral-300">Grid Preview</h1></div>
          <ProjectGrid data={collections() as Project[]} />
        </div>
      </Show>
    </main>
  );
}
