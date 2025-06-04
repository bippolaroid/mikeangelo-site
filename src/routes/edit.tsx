import { A, reload, useSearchParams } from "@solidjs/router";
import ProjectPage from "./project";
import { Project } from "~/types/data";
import {
  createEffect,
  createResource,
  createSignal,
  onMount,
  Show,
} from "solid-js";
import { getLocalData } from "~/utils/data_utils";
import ProjectEditor from "~/components/ProjectEditor";

export default function EditPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [collections, getCollections] = createResource<Project[]>(getLocalData);
  const [project, setProject] = createSignal<Project>();
  const [refreshSignal, setRefreshSignal] = createSignal<boolean>(false);

  if (!Number(searchParams.id)) {
    setSearchParams({ id: 0 });
  }

  createEffect(() => {
    if (collections() as Project[]) {
      let focus_project = collections() as Project[];
      if (Number(searchParams.id) >= focus_project.length) {
        setSearchParams({ id: focus_project.length - 1 });
        setProject(focus_project[Number(searchParams.id)]);
      } else {
        setProject(focus_project[Number(searchParams.id)]);
      }
    }
  });

  return (
    <main class="w-full xl:h-[87vh] grid justify-between gap-4 xl:flex my-6 p-4 bg-neutral-800">
          <div class="p-4 bg-neutral-100 rounded-md flex items-center 2xl:items-start">
        <A class="text-xs text-neutral-500 underline hover:text-neutral-300 cursor-pointer" href="/dashboard">Back</A>
      </div>
      <Show when={project()}>
        <div class="w-full xl:max-w-md xl:overflow-auto">
          <ProjectEditor
            project={project() as Project}
            refreshSignal={{
              accessor: refreshSignal,
              setter: setRefreshSignal,
            }}
          />
        </div>
        <div class="w-full xl:max-h-[100vh] rounded-xl xl:overflow-auto ring ring-neutral-700">
          <Show when={!refreshSignal()}>
            <ProjectPage editing={true} project={project() as Project} />
          </Show>
        </div>
      </Show>
    </main>
  );
}
