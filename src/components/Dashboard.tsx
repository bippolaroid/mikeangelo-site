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
import Loading from "./Loading";

export default function Dashboard() {
  const [collections, loadCollections] =
    createResource<Project[]>(getLocalData);
  const [remoteCollections, loadRemoteCollections] =
    createResource<Project[]>(getRemoteData);
  const [syncStatus, setSyncStatus] = createSignal<boolean>(false);
  const [refreshSignal, setRefreshSignal] = createSignal<boolean>(false);

  createEffect(() => {
    if (refreshSignal()) {
      setTimeout(() => {
              loadCollections.refetch();
        setRefreshSignal(false);
      }, 50);
    }
    if (collections() && remoteCollections()) {
      if (collections() === remoteCollections()) setSyncStatus(true);
      else setSyncStatus(false);
    }
  });
  return (
    <main class="max-w-7xl py-12 w-full mx-auto px-4 lg:px-0">
      <div class="w-full grid gap-4 text-center mb-12">
        <div class="text-5xl text-neutral-800 border-b pb-4 border-neutral-800">Project Dashboard</div>
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
      <Show when={collections()} fallback={<Loading />}>
        <div class="w-full text-neutral-300 grid gap-4 grid-cols-5 backdrop-brightness-75 p-8 rounded-lg">
          <For each={collections()}>
            {(project: Project) => {
              return (
                <>
                  <div class="flex col-span-3 border-r h-full border-neutral-800 items-center w-full">
                    <div class="h-fit max-w-5 text-right border-r border-neutral-800 pr-2 text-neutral-800 w-fit flex items-center text-sm">
                      {project.id}
                    </div>
                    <div class="h-full px-12 w-16 flex items-center justify-center">
                      <img
                        class="saturate-0 brightness-500 opacity-10 max-w-12 max-h-6 object-contain"
                        src={project.client_logo}
                      />
                    </div>
                    <div class="text-xl h-full w-full">{project.title}</div>
                  </div>
                  <div class="h-full w-full text-neutral-800 flex items-center text-sm border-r border-neutral-800">
                    {project.last_modified}
                  </div>
                  <div class="h-full w-full flex gap-2 items-center text-sm">
                    <A
                      class="underline text-neutral-500 hover:text-neutral-300"
                      href={`/project?id=${project.id}`}
                    >
                      View
                    </A>
                    <A
                      class="underline text-neutral-500 hover:text-neutral-300"
                      href={`/edit?id=${project.id}`}
                    >
                      Edit
                    </A>
                    <A
                      class="underline text-neutral-500 hover:text-neutral-300"
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
            class="mt-4 text-xl w-fit cursor-pointer bg-neutral-50 hover:bg-neutral-300 rounded text-neutral-950 px-4 py-3"
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
          <div class="pb-4 w-full flex justify-center border-b border-neutral-800">
            <h1 class="text-5xl text-neutral-800">Grid Preview</h1>
          </div>
          <ProjectGrid data={collections() as Project[]} />
        </div>
      </Show>
    </main>
  );
}
