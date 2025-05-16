import { renderMedia } from "../components//utils";
import * as DB from "../data/projects.json";
import { useSearchParams } from "@solidjs/router";
import { For } from "solid-js";

export default function ProjectPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!searchParams.id || !Number(searchParams.id)) {
    setSearchParams({ id: 0 });
  }
  const {
    id,
    client,
    accentColor,
    title,
    tags,
    featured,
    summary,
    keypoints,
    clientLogo,
  } = DB.projects[Number(searchParams.id)];

  return (
    <main class="max-w-7xl p-3 xl:p-0 mx-auto">
        <div class="grid gap-3 py-12">
          <div
            class="flex gap-3 items-center justify-between rounded px-3 py-3"
            style={`background-color: ${accentColor};`}
          >
            <img
              class=" max-h-[24px] md:max-h-[36px] max-w-[72px] md:max-w-[96px]"
              src={clientLogo}
            />
            <h3 class="text-sm md:text-xl uppercase tracking-widest text-neutral-50">
              {client}
            </h3>
          </div>
          <div class="mt-6">
            <h2 class="text-3xl lg:text-5xl font-bold">{title}</h2>
          </div>
          <div class="flex gap-1">
            <For each={tags}>
              {(tag) => {
                return (
                  <div class="w-fit px-2 py-0.5 text-xs text-neutral-100 bg-neutral-300 rounded">
                    {tag}
                  </div>
                );
              }}
            </For>
          </div>
        </div>
        <div class="lg:flex">
          <div class="w-full mb-3 lg:mb-0">{renderMedia(featured)}</div>
          <div class="w-full">
            <div class="p-3 lg:ml-3 ring ring-neutral-200 rounded-lg">
              <p>{summary}</p>
            </div>
          </div>
        </div>
      <div class="grid gap-12 bg-neutral-100 border-t border-neutral-300 py-12">
        <For each={keypoints}>
          {(keypoint) => {
            return (
              <div class="mx-auto">
                <div class="grid gap-1 lg:flex justify-center items-center">
                  <h2 class="text-3xl pb-3 text-neutral-300">
                    {keypoint.title}
                  </h2>
                  <p class="lg:p-3 mx-auto lg:ring ring-neutral-300 pb-3">
                    {keypoint.summary}
                  </p>
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
  );
}
