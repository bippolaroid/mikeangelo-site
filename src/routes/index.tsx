import { A, json } from "@solidjs/router";
import { createSignal, For, onMount, Show } from "solid-js";
import Project from "~/components/Project";
import * as DB from "../db.json";

export default function Home() {
  return (
    <main class="mx-auto">
      <div class=" lg:pb-10 border-b border-neutral-300 bg-gradient-to-t from-neutral-100 to-neutral-50 py-12 flex items-center">
        <div class="p-3 xl:p-0 max-w-7xl lg:flex grid gap-3 lg:gap-6 justify-between items-center mx-auto text-center lg:text-left">
          <div class="w-full lg:max-w-[33.3%] row-start-2">
            <img
              src="https://pub-9edaa7810b9a41c4ad3e323fc3af3bfa.r2.dev/me-on-thing.png"
              class="h-[288px] w-full mx-auto max-w-[540px] object-cover object-[60%_40%] rounded"
            />
          </div>
          <div class="w-full">
            <h1 class="text-5xl font-bold mb-3">🤘 Hello! I'm Mike.</h1>
            <h3 class="text-xl mb-8">
              <strong>
                I'm an Art Director and web developer located in New Jersey.
              </strong>
            </h3>
            <hr class="border-neutral-300 my-12 max-w-[72px] mx-auto lg:mx-0" />

            <p class="text-xl max-w-3xl xl:max-w-[100vw] mb-6 text-left">
              I specialize in design, editing, advertising campaigns, digital marketing,
              web design & app development. Please feel free to{" "}
              <A
                class="underline text-neutral-950 hover:text-neutral-300"
                href=""
              >
                reach out!
              </A>{" "}
              I'd love to help build your idea.
            </p>
          </div>
        </div>
      </div>
      {/*
      Implement 2x2 grid for xl maybe lg
      */}
      <For each={DB.projects}>
        {(project) => {
          return <Project data={project} />;
        }}
      </For>
    </main>
  );
}
