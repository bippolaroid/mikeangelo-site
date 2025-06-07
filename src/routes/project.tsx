import { renderMedia } from "~/utils/data_utils";
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
import { getRemoteData } from "~/utils/server_utils";

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
      <main
        class={`w-full px-4 mt-1 border-t border-neutral-950 mx-auto ${
          editing_param ? "rounded-xl" : "max-w-7xl"
        }`}
      >
        <div class="grid gap-4 py-12">
          <h2 class="text-5xl text-neutral-50 font-bold">{project()!.title}</h2>
          <div class="flex gap-1">
            <For each={project()!.tags}>
              {(tag) => {
                return (
                  <div class="w-fit px-4 py-1 text-xs text-neutral-500 bg-neutral-900 rounded-xl">
                    {tag}
                  </div>
                );
              }}
            </For>
          </div>
          <div
            class="flex gap-2 border-l-8 ring ring-neutral-950 items-center px-4 py-2"
            style={`border-color: ${project()!.accent_color};`}
          >
            <img
              class="max-h-[24px] md:max-h-[18px] max-w-[36px] md:max-w-[48px]"
              src={project()!.client_logo}
            />
            <h3 class="text-sm md:text-sm uppercase tracking-widest text-neutral-50">
              {project()!.client}
            </h3>
          </div>
        </div>
        <div class="grid lg:flex gap-4 mb-12">
          <div class="w-full">
            <div class="p-4 text-neutral-300 border border-dashed border-neutral-900 rounded-xl backdrop-brightness-125">
              <p>{project()!.summary}</p>
            </div>
          </div>
          <div class="w-full mb-4 lg:mb-0">
            {renderMedia(project()!.featured)}
          </div>
          
        </div>
        <div
          class={`rounded-xl grid gap-12 my-12 text-neutral-50 bg-gradient-to-tl to-black-950 from-neutral-900 ring ring-neutral-900 py-12`}
        >
          <For each={project()!.keypoints}>
            {(keypoint) => {
              return (
                <div class="mx-auto px-4 max-w-5xl">
                  <div class="grid gap-12 justify-center items-center">
                    <div class="">
                      <h2 class="text-3xl pb-4 text-neutral-50">
                        {keypoint.title}
                      </h2>
                      <p class="lg:p-4 mx-auto text-neutral-300 lg:border border-dashed rounded-xl border-neutral-900 backdrop-brightness-125 p-4">
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
