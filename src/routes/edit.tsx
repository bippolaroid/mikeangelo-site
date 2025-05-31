import { useSearchParams } from "@solidjs/router";
import ProjectPage from "./project";
import { Project, ProjectFactory } from "~/types/data";
import { createEffect, createResource, createSignal, onMount } from "solid-js";
import { getData } from "~/utils/data_utils";
import ProjectEditor from "~/components/ProjectEditor";

export default function EditPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [collections, getCollections] = createResource<Project[]>(getData);
  const [projectIndex, setProjectIndex] = createSignal<number>(Number(searchParams.id));
  const [project, setProject] = createSignal<Project>(new ProjectFactory().default(0));

createEffect(() => {
    if(collections()) {
        setProject(collections()![projectIndex()])
    }
})

  return (
    <main class="w-full flex gap-1 px-3 pb-10 grid-cols-2">
      <div class="w-full pt-9 p-3 max-w-xl"><ProjectEditor collections={collections()} project={project()} projectIndex={projectIndex()} /></div>
      <div class="w-full">
        <ProjectPage editing={true} project={projectIndex()} />
      </div>
    </main>
  );
}
