import { A, json } from "@solidjs/router";
import { createSignal, For, onMount, Show } from "solid-js";
import Project from "~/components/Project";
import * as DB from "../db.json";

export default function Home() {
  return (
    <main class="mx-auto">
      <div class=" lg:pb-10 border-b border-neutral-300 bg-gradient-to-t from-neutral-100 to-neutral-50 py-12 flex items-center">
        <div class="p-3 2xl:p-0 max-w-7xl lg:flex grid gap-3 lg:gap-6 justify-between items-center mx-auto text-center lg:text-left">
          <div class="w-full lg:max-w-[33.3%] row-start-2">
            <img
              src="https://pub-9edaa7810b9a41c4ad3e323fc3af3bfa.r2.dev/me-on-thing.jpg"
              class="h-[288px] w-full mx-auto max-w-[540px] object-cover object-[60%_40%] rounded"
            />
          </div>
          <div class="w-full">
            <h1 class="text-5xl lg:text-7xl font-bold mb-3">
              Hello! I'm Mike 🤘
            </h1>
            <h3 class="text-xl lg:text-3xl">
              I'm an{" "}
              <span class="font-bold underline cursor-pointer text-neutral-950 hover:text-neutral-300">
                Art Director
              </span>{" "}
              and{" "}
              <span class="font-bold underline cursor-pointer text-neutral-950 hover:text-neutral-300">
                web developer
              </span>{" "}
              in New Jersey.
            </h3>

            <p class="text-lg max-w-3xl xl:max-w-[100vw] mb-6 mt-12 lg:mt-3 text-left">
              I specialize in design, editing, advertising campaigns, digital
              marketing, web design & app development. Please feel free to{" "}
              <A
                class="underline text-neutral-950 hover:text-neutral-300 font-bold"
                href="./#footer"
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
