import { A } from "@solidjs/router";
import { createSignal, onMount, Show } from "solid-js";

export default function Home() {
  const [projectOpen, setProjectOpen] = createSignal<boolean>(false);

  onMount(() => {
    document.getElementById("main")!.style.background =
      "url('./public/video-1.mp4')";
  });
  return (
    <main id="main" class="mx-auto">
      <div class="p-4 lg:p-0 lg:pb-10 border-b border-neutral-300 bg-gradient-to-t from-neutral-100 to-neutral-50 py-12 flex items-center">
        <div class="max-w-7xl lg:flex grid gap-4 lg:gap-12 justify-between items-center mx-auto text-center lg:text-left">
        <div class="row-start-2">
            <img src="./public/favicon.ico" class="w-[288px] mx-auto h-auto" />
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
            I specialize in ad campaigns, design, editing, and web & app development.
            {" "}
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
      <div class="max-w-7xl mx-auto p-3 lg:p-2">
        <div class="grid gap-3 my-6">
          <div class="border-l-8 border-amber-500 px-3"><h3 class="text-xl uppercase tracking-widest">Chubb</h3></div>
          <div><h2 class="text-3xl">Project Title</h2></div>
          <div class="flex items-center">
            <div class="bg-neutral-300 px-3 rounded text-sm text-neutral-50">
              Art Director
            </div>
          </div>
        </div>
        <div class="lg:flex">
          <div class="mb-3 lg:mb-2">
            <video src="./public/video-1.mp4" controls></video>
          </div>
          <div>
            <div class="p-3 lg:ml-3 ring ring-neutral-200 rounded min-w-sm">
              <p>
                This is a description of the project. You can say whatever you
                want here, it doesn't matter at all.
              </p>
              <button
              class="bg-neutral-950 hover:bg-neutral-300 mt-3 px-3 py-1 cursor-pointer rounded text-neutral-50"
              onClick={() => {
                setProjectOpen(!projectOpen());
              }}>
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <Show when={projectOpen()}>
        <div class="bg-neutral-100 h-[50vh] border-t border-neutral-300">
          <div class="max-w-7xl px-3 py-2 lg:p-2 mx-auto">
            hi
          </div>
        </div>
      </Show>
    </main>
  );
}
