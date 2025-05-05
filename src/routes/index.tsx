import { A, json } from "@solidjs/router";
import { createSignal, For, onMount, Show } from "solid-js";
import Project from "~/components/Project";
import * as DB from "../db.json";

export default function Home() {
  return (
    <main class="mx-auto">
      <div class="p-4 lg:p-0 lg:pb-10 border-b border-neutral-300 bg-gradient-to-t from-neutral-100 to-neutral-50 py-12 flex items-center">
        <div class="max-w-7xl lg:flex grid gap-4 lg:gap-12 justify-between items-center mx-auto text-center lg:text-left">
          <div class="row-start-2 h-[5vh] min-h-[288px]">
            <img
              src="./public/favicon.ico"
              class="w-full h-full object-cover mx-auto"
            />
          </div>
          <div class="max-w-xl">
            <h1 class="text-5xl font-bold mb-3">Hello! I'm Mike.</h1>
            <hr class="border-neutral-300 my-6 max-w-[72px] mx-auto lg:mx-0" />
            <h3 class="text-xl">
              <strong>
                I'm an Art Director and web developer in New Jersey.
              </strong>
            </h3>
            <p class="text-xl">
              I specialize in ad campaigns, editing, digital media, and web &
              app development.{" "}
              <A
                class="underline text-neutral-950 hover:text-neutral-300"
                href=""
              >
                Reach out!
              </A>{" "}
              I'd love to help build your idea.
            </p>
          </div>
        </div>
      </div>
      <For each={DB.projects}>
        {(project) => {
          return <Project data={project} />;
        }}
      </For>
    </main>
  );
}
