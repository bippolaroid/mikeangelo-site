import { reload, useSearchParams } from "@solidjs/router";
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
    <main class="w-full grid justify-between h-[87vh] gap-4 xl:flex my-6 bg-neutral-800">
      <Show when={project()}>
        <div class="w-full xl:max-w-lg xl:overflow-auto">
          <ProjectEditor
            project={project() as Project}
            refreshSignal={{
              accessor: refreshSignal,
              setter: setRefreshSignal,
            }}
          />
        </div>
        <div class="w-full xl:max-h-[100vh] xl:overflow-auto">
          <Show when={!refreshSignal()}>
            <ProjectPage editing={true} project={project() as Project} />
          </Show>
        </div>
      </Show>
    </main>
  );
}
