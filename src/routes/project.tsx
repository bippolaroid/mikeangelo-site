import { hit, renderMedia } from "../components/utils";
import { useSearchParams } from "@solidjs/router";
import {
  createEffect,
  createResource,
  createSignal,
  For,
  Show,
} from "solid-js";
import Loading from "~/components/Loading";
import { Project } from "~/types/data";
import { getData, getLocalData, getRemoteData } from "~/utils/data_utils";

interface ProjectPageProps {
  project?: Project;
  editing?: boolean | false;
}

export default function ProjectPage(props: ProjectPageProps) {
  const [collections, loadCollections] =
    createResource<Project[]>(getRemoteData);
  const [project, setProject] = createSignal<Project>();
  const { project: project_param, editing: editing_param } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  if (!Number(searchParams.id)) {
    setSearchParams({ id: 0 });
  }

  createEffect(() => {
    if (collections()) {
        let collections_array: Project[] = collections() as Project[];

      if (project_param && editing_param) {
        setProject(project_param);
      } else {
        collections_array = collections() as Project[];
        if (Number(searchParams.id) >= collections_array.length) {
          setSearchParams({ id: collections_array.length - 1 });
          setProject(collections_array[Number(searchParams.id)]);
        } else {
          setProject(collections_array[Number(searchParams.id)]);
        }
      }
    }
  });

  return (
    <Show when={project()} fallback={<Loading />}>
      <main class={`w-full py-4 px-4 bg-neutral-900 mx-auto ${editing_param ? "rounded-xl" : "max-w-7xl 2xl:px-0"}`}>
        <div class="grid gap-4 pb-12">
          <div
            class="flex gap-2 items-center justify-between px-6 py-4"
            style={`background-color: ${project()!.accent_color};`}
          >
            <img
              class="max-h-[24px] md:max-h-[36px] max-w-[72px] md:max-w-[96px]"
              src={project()!.client_logo}
            />
            <h3 class="text-sm md:text-xl uppercase tracking-widest text-neutral-50">
              {project()!.client}
            </h3>
          </div>
          <div class="mt-6">
            <h2 class="text-3xl lg:text-5xl text-neutral-50 font-bold">{project()!.title}</h2>
          </div>
          <div class="flex gap-2">
            <For each={project()!.tags}>
              {(tag) => {
                return (
                  <div class="w-fit px-2 py-1 text-xs text-amber-500 bg-amber-950 rounded-lg">
                    {tag}
                  </div>
                );
              }}
            </For>
          </div>
        </div>
        <div class="lg:flex mb-12">
          <div class="w-full mb-4 lg:mb-0">
            {renderMedia(project()!.featured)}
          </div>
          <div class="w-full">
            <div class="p-4 lg:ml-4 text-neutral-400 ring ring-neutral-800 rounded-xl backdrop-brightness-125">
              <p>{project()!.summary}</p>
            </div>
          </div>
        </div>
        <div class={`rounded-xl grid gap-12 mt-4 text-neutral-50 shadow-lg shadow-neutral-950 bg-gradient-to-tl from-neutral-950 to-neutral-800 border-t border-b border-neutral-500 py-12`}>
          <For each={project()!.keypoints}>
            {(keypoint) => {
              return (
                <div class="mx-auto px-4 max-w-5xl">
                  <div class="grid gap-12 justify-center items-center">
                    <div class="">
                      <h2 class="text-3xl pb-4 text-neutral-50">
                        {keypoint.title}
                      </h2>
                      <p class="lg:p-4 mx-auto text-neutral-400 lg:ring rounded-xl ring-neutral-800 backdrop-brightness-125 p-4">
                        {keypoint.summary}
                      </p>
                    </div>
                    <div class="mx-auto w-full">
                      {renderMedia(keypoint.featured[0])}
                    </div>
                  </div>
                </div>
              );
            }}
          </For>
        </div>
      </main>
    </Show>
  );
}
