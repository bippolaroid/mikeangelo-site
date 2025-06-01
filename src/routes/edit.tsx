import { useSearchParams } from "@solidjs/router";
import ProjectPage from "./project";
import { Project } from "~/types/data";
import {
  createEffect,
  createResource,
  createSignal,
  onMount,
  Show,
} from "solid-js";
import { getData } from "~/utils/data_utils";
import ProjectEditor from "~/components/ProjectEditor";

export default function EditPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [collections, getCollections] = createResource<Project[]>(getData);
  const [projectIndex, setProjectIndex] = createSignal<number>(
    Number(searchParams.id)
  );
  const [project, setProject] = createSignal<Project>();

  createEffect(() => {
    if (collections()) {
      setProject(collections()![projectIndex()]);
    }
  });

  return (
    <main class="w-full lg:flex gap-1 px-3 pb-10">
      <Show when={project()}>
        <div class="w-full pt-9 p-3 lg:max-w-xl">
          <ProjectEditor project={project() as Project} />
        </div>
        <div class="w-full">
          <ProjectPage editing={true} project={projectIndex()} />
        </div>
      </Show>
    </main>
  );
}
