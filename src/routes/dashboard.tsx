import {
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import ProjectEditor from "~/components/ProjectEditor";
import { Keypoint, Project, ProjectFactory } from "~/types/data";
import { getData, sendDataToServer, deleteData } from "~/utils/data_utils";

export default function DashboardPage() {
  const [collections, loadCollections] = createResource<Project[]>(getData);

  createEffect(() => {});
  return (
    <main class="lg:grid lg:grid-cols-2 max-w-7xl mx-auto gap-6 p-3 xl:p-0 py-12 xl:pb-12">
      <div class="mx-auto grid gap-3 text-center mb-12 col-span-2">
        <div class="text-5xl text-neutral-300">Creator Dashboard</div>
        <div class="mx-auto min-w-24 w-fit p-1 rounded-full text-xs ring ring-green-500 bg-green-200 text-green-500">
          Up to date
        </div>
      </div>
      <Show when={collections()}>
        <For each={collections()}>
          {(project: Project, projectIndex) => {
            return (
              <>
                <ProjectEditor
                  collections={collections()}
                  project={project}
                  projectIndex={projectIndex()}
                />
              </>
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
      </Show>
    </main>
  );
}
